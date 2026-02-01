import { appgetTree } from "../api";
import { useRouter } from "next/router";
import { useEffect, useState, React, useRef } from "react";
import SkeletonLoader from "@/src/components/tree/SkeletonLoader";
import f3 from "@/src/components/tree/appFamilyChart";

const FamilyTreePage = () => {
  const containerRef = useRef(null);
  var m = 1;
  const [isErrorPopup, setErrorPopup] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);

  const getPageData = async (queryData) => {
    console.log(queryData);
    m++;
    try {
      //if (!containerRef.current) return;

      const treeObjMembers = await appgetTree(queryData);
      const treeObj = treeObjMembers?.data?.data?.members;
      console.log("Json Data: ", treeObj);

      if (treeObj) {
        console.log("treeObjtreeObj Data: ", treeObj);
        //setTreeData(treeObj);
        //setFilteredTreeData(treeObj);
        setLoading(false);
        if (!containerRef.current) {
          console.log("containerRef", containerRef);
        }
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
              // (d) =>  d?.data["city"] || d?.data["state"]
              // ? `${d?.data["city"] || ""}/${d?.data["state"] || ""}`
              // : "",
            ],
            cardAddform: addform,
            cardEditForm: editform,
            memberInfo: (d) => memberinfo(d),
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
      return () => {
        // Add any necessary cleanup logic here
      };
    } catch (error) {
      console.log("errorerror", error);
      if (
        error.message &&
        error.message.includes("Cannot read properties of undefined")
      ) {
        // Handle this specific error
        console.log("Handling 'Cannot read properties of undefined' error.");
      } else {
        setErrorPopup(true);
        console.error("Error fetching family members:", error);
      }
    } finally {
      // Set a timeout for 2 seconds (2000 milliseconds)
      const timer = setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };

  const addform = (d) => {
    var id = d.datum.id;
    if (typeof AndroidInterface !== "undefined" && AndroidInterface.addMember) {
      AndroidInterface.addMember(id, JSON.stringify(d?.datum?.rels)); // Call the Android function
    } else if (typeof iOSInterface !== "undefined" && iOSInterface.addMember) {
      iOSInterface.addMember(id, JSON.stringify(d?.datum?.rels)); // Call the iOS function
    } else {
      console.error("AndroidInterface is not available");
    }
  };
  const reload = () => {
    if (
      typeof AndroidInterface !== "undefined" &&
      AndroidInterface.reloadpage
    ) {
      AndroidInterface.reloadpage(); // Call the Android function
    } else if (typeof iOSInterface !== "undefined" && iOSInterface.reloadpage) {
      iOSInterface.reloadpage(); // Call the iOS function
    } else {
      console.error("AndroidInterface is not available");
    }
  };
  const memberinfo = (d) => {
    var id = d.datum.id;
    console.log("11111");
    if (
      typeof AndroidInterface !== "undefined" &&
      AndroidInterface.infoMember
    ) {
      AndroidInterface.infoMember(id); // Call the Android function
    } else if (typeof iOSInterface !== "undefined" && iOSInterface.infoMember) {
      iOSInterface.infoMember(id); // Call the iOS function
    } else {
      console.error("AndroidInterface is not available");
    }
  };

  const editform = (d) => {
    var id = d.datum.id;
    if (
      typeof AndroidInterface !== "undefined" &&
      AndroidInterface.editMember
    ) {
      AndroidInterface.editMember(id); // Call the Android function
    } else if (typeof iOSInterface !== "undefined" && iOSInterface.editMember) {
      iOSInterface.editMember(id); // Call the iOS function
    } else {
      console.error("AndroidInterface is not available");
    }
  };

  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
    }

    if (m == 1) {
      console.log("router.get treeId", router.query.treeId);
      router.query.id = router.query.treeId;
      const timer = setTimeout(() => {
        getPageData(router.query);
      }, 1000);
      //const svg = containerRef.current.querySelector("svg"); // Assuming there's an SVG element within
      //if (svg) {
      //  svg.setAttribute("width", "500");
      //  svg.setAttribute("height", "300");
      //}
    }
  }, [router.isReady]);

  return (
    <div>
      {loading ? (
        <>
          <SkeletonLoader />
        </>
      ) : (
        <>
          <section className="cta-section division mb-4">
            <div className="" style={{ zIndex: "0" }}>
              {isErrorPopup}
              <div style={{ width: "100%", height: "100vh" }}>
                {isErrorPopup === true ? (
                  <>
                    <div
                      className="alert alert-danger"
                      style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: "9999",
                        width: "50%", // You can adjust this width if needed
                        textAlign: "center",
                      }}
                    >
                      <p>Operation was not successful. Please try again.</p>

                      <button
                        style={createButtonStyle}
                        onClick={() => reload()}
                      >
                        Try Again
                      </button>
                    </div>
                  </>
                ) : (
                  ""
                )}

                <div style={{ width: "100%", height: "100vh", float: "right" }}>
                  <div className="f3" id="FamilyChart" ref={containerRef}></div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

const createButtonStyle = {
  marginBottom: "20px",
  padding: "10px 15px",
  border: "none",
  backgroundColor: "#4CAF50",
  color: "white",
  borderRadius: "4px",
  cursor: "pointer",
};

export default FamilyTreePage;
