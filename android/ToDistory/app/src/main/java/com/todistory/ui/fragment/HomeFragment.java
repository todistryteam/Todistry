package com.todistory.ui.fragment;

import static android.app.Activity.RESULT_OK;

import android.app.Dialog;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.RelativeLayout;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.android.material.progressindicator.CircularProgressIndicator;
import com.todistory.R;
import com.todistory.api.ApiConstants;
import com.todistory.common.Helper;
import com.todistory.ui.activity.PublishTreeActivity;
import com.todistory.ui.activity.ShareTreeCodeActivity;
import com.todistory.ui.activity.createfamily.AddFamilyMemberActivity;
import com.todistory.ui.activity.createfamily.EditMemberActivity;
import com.todistory.ui.activity.createfamily.MemberInfoActivity;
import com.todistory.ui.helper.Utility;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class HomeFragment extends Fragment {

    WebView treeWebView;
    CircularProgressIndicator progressIndicator;
    //ImageView ivHome;
    //TextView txtTreeName;
    RelativeLayout rlPublishTree;
    String memberType = "", siblingType = "", treeUrl = "", treeCode = "";
    Dialog familyRelationSelectionDialog;
    Dialog siblingSelectionDialog;
    int REQUEST_CODE = 1;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_home, container, false);
        treeWebView = view.findViewById(R.id.treeWebView);
        progressIndicator = view.findViewById(R.id.progressIndicator);
        //txtTreeName = view.findViewById(R.id.txtTreeName);
        //ivHome = view.findViewById(R.id.ivHome);
        rlPublishTree = view.findViewById(R.id.rlPublishTree);

        progressIndicator.setVisibility(View.VISIBLE);
        treeWebView.setVisibility(View.GONE);
        rlPublishTree.setVisibility(View.GONE);
        rlPublishTree.setOnClickListener(v -> {
//            Intent intent = new Intent(getActivity(), PublishTreeActivity.class);
//            //intent.putExtra("AdminName", txtTreeName.getText().toString());
//            intent.putExtra("treeUrl", treeUrl);
//            startActivity(intent);

            Intent intent = new Intent(getActivity(), ShareTreeCodeActivity.class);
            intent.putExtra("treeUrl", treeUrl);
            intent.putExtra("treeCode", treeCode);
            startActivity(intent);
        });

//        ivHome.setOnClickListener(v -> {
//            Helper.clearPreferences(getActivity());
//            Intent intent = new Intent(getActivity(), WelcomeActivity.class);
//            startActivity(intent);
//            getActivity().finish();
//        });
        treeWebView.clearCache(true);
        treeWebView.clearHistory();
        treeWebView.clearFormData();

        treeWebView.setBackgroundColor(Color.WHITE);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            treeWebView.getSettings().setForceDark(WebSettings.FORCE_DARK_OFF);
        }
        treeWebView.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);
        treeWebView.getSettings().setJavaScriptEnabled(true);
        treeWebView.getSettings().setSupportZoom(true);
        treeWebView.getSettings().setBuiltInZoomControls(true);
        treeWebView.getSettings().setDisplayZoomControls(false);
        treeWebView.getSettings().setCacheMode(WebSettings.LOAD_DEFAULT);
        treeWebView.getSettings().setDomStorageEnabled(true);
        treeWebView.getSettings().setUseWideViewPort(true);
        treeWebView.getSettings().setCacheMode(WebSettings.LOAD_CACHE_ELSE_NETWORK);
        treeWebView.addJavascriptInterface(new WebAppInterface(getActivity()), "AndroidInterface");
        treeWebView.setWebViewClient(new WebViewClient() {

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                view.loadUrl(url);
                return true;
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                progressIndicator.setVisibility(View.GONE);
                treeWebView.setVisibility(View.VISIBLE);
                rlPublishTree.setVisibility(View.VISIBLE);
            }

            @Override
            public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
                Toast.makeText(getActivity(), description, Toast.LENGTH_SHORT).show();
            }
        });
        getTreeDetails();
        return view;
    }

    public class WebAppInterface {
        Context mContext;

        WebAppInterface(Context c) {
            mContext = c;
        }

        @JavascriptInterface
        public void addMember(String parentId, String data) {
            try {
                JSONObject familyObject = new JSONObject(data);
//                if (familyObject.has("father") && !familyObject.isNull("father")
//                        && Utility.isIntegerIdOrNot(familyObject.getString("father"))
//                        && familyObject.has("mother") && !familyObject.isNull("mother")
//                        && Utility.isIntegerIdOrNot(familyObject.getString("mother"))) {
//                    showDialogForRelationSelection(parentId, false);
//                } else {
//                    showDialogForRelationSelection(parentId, true);
//                }

                Intent intent = new Intent(getActivity(), AddFamilyMemberActivity.class);
                intent.putExtra("parentId", parentId);
                startActivityForResult(intent, REQUEST_CODE);

            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        @JavascriptInterface
        public void editMember(String memberId) {
            Log.e("ToDistry: ", "Edit Member...");
            Intent intent = new Intent(getActivity(), EditMemberActivity.class);
            intent.putExtra("memberId", memberId);
            startActivityForResult(intent, REQUEST_CODE);
        }

        @JavascriptInterface
        public void infoMember(String memberId) {
            Log.e("ToDistry: ", "Info Member...");
//            Intent intent = new Intent(getActivity(), MemberInfoActivity.class);
//            intent.putExtra("memberId", memberId);
//            startActivity(intent);

            Intent intent = new Intent(getActivity(), MemberInfoActivity.class);
            intent.putExtra("memberId", memberId);
            startActivityForResult(intent, REQUEST_CODE);
        }

        @JavascriptInterface
        public void reloadpage() {
            treeWebView.post(new Runnable() {
                @Override
                public void run() {
                    treeWebView.reload();
                }
            });
        }
    }

    private void getTreeDetails() {
        RequestQueue requestQueue = Volley.newRequestQueue(getActivity());
        StringRequest stringRequest = new StringRequest(Request.Method.POST, ApiConstants.GET_TREE_DETAILS,
                response -> {
                    try {
                        Log.e("ToDistry: ", "Response: " + response);
                        JSONObject jsonObject = new JSONObject(response);
                        Log.e("ToDistry: ", "Tree URL: " + jsonObject.getString("url"));
                        treeUrl = jsonObject.getString("url");
                        treeCode = jsonObject.getJSONObject("data").getString("treeCode");
                        treeWebView.loadUrl(jsonObject.getString("url"));
                        //txtTreeName.setText(jsonObject.getJSONObject("data").getString("treeName"));
                    } catch (JSONException e) {
                        progressIndicator.setVisibility(View.GONE);
                        treeWebView.setVisibility(View.GONE);
                        rlPublishTree.setVisibility(View.GONE);
                        e.printStackTrace();
                        Helper.dismissProgressDialog();
                        Utility.showToastMessage(getActivity(), e.getMessage());
                    }
                }, error -> {
            progressIndicator.setVisibility(View.GONE);
            treeWebView.setVisibility(View.GONE);
            rlPublishTree.setVisibility(View.GONE);
            Utility.showToastMessage(getActivity(), error.getMessage());
        }) {
            @Override
            public Map<String, String> getParams() {
                return new HashMap<>();
            }

            @Override
            public Map<String, String> getHeaders() {
                Map<String, String> params = new HashMap<>();
                params.put("accesstoken", Helper.getPreferenceData(getActivity(), "AccessToken"));
                Log.e("ToDistry: ", "Headers: " + params);
                return params;
            }
        };
//        stringRequest.setRetryPolicy(new DefaultRetryPolicy(
//                120000,
//                DefaultRetryPolicy.DEFAULT_MAX_RETRIES,
//                DefaultRetryPolicy.DEFAULT_BACKOFF_MULT));
        requestQueue.add(stringRequest);
    }


    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == REQUEST_CODE && resultCode == RESULT_OK) {
            boolean isTreeRefresh = data.getBooleanExtra("isTreeRefresh", false);
            if (isTreeRefresh) {
                treeWebView.reload();
            }
        }
    }
}