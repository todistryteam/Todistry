import CTA from "@/src/components/CTA";
import Layout from "@/src/layout/Layout";
import axios from "axios";
import { getTreeNew } from "../api";
import { useEffect, useState, useRef } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import EditNodeModal from "@/src/components/tree/EditNodeModal";
import CreateNodeModal from "@/src/components/tree/CreateNodeModal";
import f3 from "@/src/components/tree/familyChartNew";

// import fs from "fs";
// import path from "path";

const FamilyTreePage = () => {
  const containerRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [treeData, setTreeData] = useState([]);
  const [filteredTreeData, setFilteredTreeData] = useState([]);
  const [parentData, setParentData] = useState();
  const [selectedNode, setSelectedNode] = useState(null);

  const [loading, setLoading] = useState(true); // Add loading state
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    age: "",
    otherDetails: "",
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);

    // Filter suggestions based on searchTerm
    if (value) {
      const filteredSuggestions = treeData
        .filter(
          (member) =>
            member.data.first_name
              ?.toLowerCase()
              .includes(value.toLowerCase()) ||
            member.data.last_name?.toLowerCase().includes(value.toLowerCase())
        )
        .map((member) => ({
          id: member.id, // Assuming each member has a unique id in `member.data.id`
          fullName: `${member.data.first_name || ""} ${
            member.data.last_name || ""
          }`,
          memberObj: member,
        }));

      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = async (e) => {
    const selectedValue = e.target.value;

    const selectedSuggestion = suggestions.find(
      (suggestion) => suggestion.fullName == selectedValue
    );

    // Set the selectedId if a valid option is selected
    if (selectedSuggestion) {
      setSelectedId(selectedSuggestion.id);

      const getPageObj = await getPageData(selectedSuggestion.id);
      // console.log("select member data", selectedSuggestion.memberObj);
      // console.log("loaded tree again", getPageObj);
      let triggeredNode = "";
      console.log(
        "selectedSuggestion.memberObj?.hide_rels",
        selectedSuggestion.memberObj?.hide_rels
      );
      if (selectedSuggestion.memberObj?.rels?.spouses?.length == 0) {
        /* brother with no wife */
        console.log("brother with no wife", selectedSuggestion.memberObj?.rels);
        triggeredNode =
          selectedSuggestion.memberObj?.rels?.father.length > 0
            ? selectedSuggestion.memberObj?.rels?.father
            : "";
      } else if (
        parseInt(selectedSuggestion.memberObj?.rels?.father) > 0 &&
        parseInt(selectedSuggestion.memberObj?.rels?.mother) > 0
      ) {
        /* farther with wife and childs */
        console.log(
          "farther with wife and childs",
          selectedSuggestion.memberObj?.rels
        );
        triggeredNode =
          typeof selectedSuggestion.memberObj?.rels?.spouses[0] != undefined
            ? selectedSuggestion.memberObj?.rels?.spouses[0]
            : "";
      } else {
        triggeredNode = selectedSuggestion.id;
      }
      console.log("triggeredNode::", triggeredNode);
      if (triggeredNode != "") {
        const elements = document.querySelectorAll(
          ".memeberSearch_" + triggeredNode
        );
        elements.forEach((element) => {
          const event = new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            view: window,
          });
          element.dispatchEvent(event);
          if (element instanceof HTMLElement) {
            //element.click();
          }
        });
      }
    }
  };

  const getPageData = async (selectedIdSel) => {
    try {
      // Set loading true before fetching
      //
      setLoading(true);
      const selData = {
        selectedId: selectedIdSel,
      };
      const treeObjMembers = await getTreeNew(selData);
      const treeObj = treeObjMembers?.data?.data?.members;
      console.log("Json Data: ", treeObj);

      if (treeObj) {
        setTreeData(treeObj);
        setFilteredTreeData(treeObj);
        setLoading(false);
        if (!containerRef.current) return;
        const svg = containerRef.current.querySelector("svg");

        if (svg) {
          svg.setAttribute("width", "500");
          svg.setAttribute("height", "300");
        }
        const store = f3.createStore({
            data: treeObj,
            node_separation: 250,
            level_separation: 150,
          }),
          view = f3.d3AnimationView({
            store,
            cont: document.querySelector("#FamilyChart"),
          }),
          Card = f3.elements.Card({
            store,
            svg: view.svg,
            card_dim: {
              w: 230,
              h: 120,
              text_x: 75,
              text_y: 15,
              img_w: 60,
              img_h: 60,
              img_x: 5,
              img_y: 5,
            },
            card_display: [
              (d) => `${d?.data["nameSuffix"] || ""}`,
              (d) => `${d?.data["first_name"] || ""}`,
              (d) => `${d?.data["last_name"] || ""}`,
              (d) => `${d?.data["relationShipToAdmin"] || ""}`,
              // (d) =>
              //   d?.data["city"] || d?.data["state"]
              //     ? `${d?.data["city"] || ""}/${d?.data["state"] || ""}`
              //     : "",
            ],
            cardAddform: setCreateModalIsOpen,
            cardEditForm: setModalIsOpen,
            mini_tree: true,
            link_break: false,
          });
        view.setCard(Card);
        store.setOnUpdate((props) => view.update(props || {}));
        store.update.tree({ initial: true });

        document.querySelectorAll(".card").forEach((card) => {
          card.addEventListener("mouseenter", () => {
            card.classList.add("hover"); // Add hover class on mouse enter
          });
          card.addEventListener("mouseleave", () => {
            card.classList.remove("hover"); // Remove hover class on mouse leave
          });
        });
      }
    } catch (error) {
      console.error("Error fetching family members:", error);
    } finally {
      // Set a timeout for 2 seconds (2000 milliseconds)
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    setTimeout(() => getPageData(), [1000]);
  }, []);

  const handleNodeClick = (nodeData) => {
    setSelectedNode(nodeData);
    setFormData({
      name: nodeData.name,
      image: nodeData.image,
    });
    setModalIsOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditNode = async () => {
    if (selectedNode) {
      try {
        const updatedData = {
          name: formData.name,
          image: formData.image,
          age: parseInt(formData.age),
          otherDetails: formData.otherDetails,
        };

        await axios.put(`/api/members/${selectedNode.id}`, updatedData);
        getPageData();
        setSelectedNode(null);
        setModalIsOpen(false);
      } catch (error) {
        console.error("Error updating member:", error);
      }
    }
  };

  const handleDeleteNode = async () => {
    if (selectedNode) {
      try {
        await axios.delete(`/api/members/${selectedNode.id}`);
        getPageData();
        setSelectedNode(null);
        setModalIsOpen(false);
      } catch (error) {
        console.error("Error deleting member:", error);
      }
    }
  };

  const handleAddRelative = (pdata) => {
    // console.log("pdata", pdata);
    if (pdata.id) {
      const elements = document.querySelectorAll(".card_add_popup_" + pdata.id);
      if (elements.length > 0) {
        setModalIsOpen(false);
        // Create a click event
        const eventPopup = new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window,
        });
        elements[0].dispatchEvent(eventPopup);
      }
    }
  };

  // Handle adding a new node
  const handleCreateNode = async (newNodeData) => {
    try {
      await axios.post("/api/members", newNodeData);
      getPageData();
      setCreateModalIsOpen(false);
    } catch (error) {
      console.error("Error creating member:", error);
    }
  };

  const isModalOpen = modalIsOpen || createModalIsOpen; // Check if any modal is open

  useEffect(() => {
    // Apply filtering logic when searchTerm or treeData changes
    if (treeData?.length > 0) {
      const filteredData = treeData
        .filter(
          (member) =>
            member.data.first_name
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            member.data.last_name
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase())
        )
        .map((member) => ({
          id: member.data.id, // Get the ID
          fullName: `${member.data.first_name || ""} ${
            member.data.last_name || ""
          }`,
        }));
      setFilteredTreeData(filteredData); // Set the filtered data
    }
  }, [searchTerm, treeData]);

  const closeModals = () => {
    setModalIsOpen(false);
    setCreateModalIsOpen(false);
  };

  const closeModals2 = (type) => {
    if (isModalOpen) {
      if (type === "add") {
        setModalIsOpen(false);
      } else if (type === "edit") {
        setCreateModalIsOpen(false);
      }
    }
  };

  return (
    <Layout navLight getStartText navHoverColor="nav-orange-red-hover">
      <section className="wide-60 cta-section division mb-4">
        <div className="container" style={{ zIndex: "0" }}>
          <div style={{ width: "100%", height: "auto" }}>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              onInput={handleSelect}
              placeholder="Search family members..."
              style={{
                marginBottom: "20px",
                padding: "10px",
                width: "100%",
              }}
              list="suggestions" // Link input to datalist
            />
            <datalist id="suggestions">
              {suggestions.map((suggestion, index) => (
                <option key={suggestion.id} value={suggestion.fullName} />
              ))}
            </datalist>
            <div className="row">
              <div className="col-12 col-lg-4 order-2 order-lg-1">
                <CreateNodeModal
                  isOpen={createModalIsOpen}
                  onRequestClose={() => closeModals()}
                  onCreateNode={handleCreateNode}
                  parentData={parentData}
                  onRequestclosemodel={() => closeModals2("add")}
                />
                <EditNodeModal
                  isOpen={modalIsOpen}
                  onRequestClose={() => closeModals()}
                  formData={formData}
                  handleInputChange={() => handleInputChange()}
                  handleEditNode={handleEditNode}
                  handleDeleteNode={handleDeleteNode}
                  handleAddRelative={handleAddRelative}
                  onRequestclosemodel={() => closeModals2("edit")}
                  parentData={parentData}
                />
              </div>
              <div className="col-12 col-lg-8 order-1 order-lg-2 dynamic-height">
                <div ref={containerRef} className="f3" id="FamilyChart"></div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </section>

      <CTA className="mt-4" />
    </Layout>
  );
};

const renderNodeWithButtons = (rd3tProps, onClick, isModalOpen) => {
  const { nodeDatum } = rd3tProps;
  const cursorStyle = isModalOpen ? "default" : "pointer"; // Change cursor style based on modal state
  return (
    <g>
      {/* Draw a circle behind the image */}
      <circle
        r={15}
        fill="lightblue"
        onClick={() => !isModalOpen && onClick(nodeDatum)}
        style={{ cursor: cursorStyle }}
      />

      {/* Render the image using SVG image element */}
      <image
        href={nodeDatum.image} // Use href attribute for SVG image
        x="5"
        y="5"
        width="60"
        height="60"
      />
      <text
        x="75"
        y="15"
        textAnchor="middle"
        fontSize="14"
        fontFamily="Arial"
        fill="black"
      >
        {nodeDatum.name}
      </text>
    </g>
  );
};

export default FamilyTreePage;
