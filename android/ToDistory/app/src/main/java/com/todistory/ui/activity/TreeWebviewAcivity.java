package com.todistory.ui.activity;

import android.annotation.SuppressLint;
import android.app.Dialog;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ImageView;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.TooltipCompat;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.android.material.progressindicator.CircularProgressIndicator;
import com.todistory.R;
import com.todistory.api.ApiConstants;
import com.todistory.common.Helper;
import com.todistory.ui.activity.createfamily.AddFamilyMemberActivity;
import com.todistory.ui.activity.createfamily.EditMemberActivity;
import com.todistory.ui.activity.createfamily.MemberInfoActivity;
import com.todistory.ui.helper.Utility;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class TreeWebviewAcivity extends AppCompatActivity {

    WebView treeWebView;
    CircularProgressIndicator progressIndicator;
    ImageView ivHome;
    TextView txtTreeName;
    RelativeLayout rlPublishTree;
    String memberType = "", siblingType = "", treeUrl = "";
    Dialog familyRelationSelectionDialog;
    Dialog siblingSelectionDialog;
    int REQUEST_CODE = 1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
        setContentView(R.layout.activity_tree_webview_acivity);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            getWindow().getAttributes().layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;
            getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
        }

        treeWebView = findViewById(R.id.treeWebView);
        progressIndicator = findViewById(R.id.progressIndicator);
        txtTreeName = findViewById(R.id.txtTreeName);
        ivHome = findViewById(R.id.ivHome);
        rlPublishTree = findViewById(R.id.rlPublishTree);

        progressIndicator.setVisibility(View.VISIBLE);
        treeWebView.setVisibility(View.GONE);
        rlPublishTree.setVisibility(View.GONE);
        rlPublishTree.setOnClickListener(v -> {
            Intent intent = new Intent(this, PublishTreeActivity.class);
            intent.putExtra("AdminName", txtTreeName.getText().toString());
            intent.putExtra("treeUrl", treeUrl);
            startActivity(intent);
        });

        ivHome.setOnClickListener(v -> {
            Helper.clearPreferences(TreeWebviewAcivity.this);
            Intent intent = new Intent(TreeWebviewAcivity.this, WelcomeActivity.class);
            startActivity(intent);
            finish();
        });
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
        treeWebView.addJavascriptInterface(new WebAppInterface(this), "AndroidInterface");
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
                Toast.makeText(TreeWebviewAcivity.this, description, Toast.LENGTH_SHORT).show();
            }
        });
        getTreeDetails();
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

                Intent intent = new Intent(TreeWebviewAcivity.this, AddFamilyMemberActivity.class);
                intent.putExtra("parentId", parentId);
                startActivityForResult(intent, REQUEST_CODE);

            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        @JavascriptInterface
        public void editMember(String memberId) {
            Log.e("ToDistry: ", "Edit Member...");
            Intent intent = new Intent(TreeWebviewAcivity.this, EditMemberActivity.class);
            intent.putExtra("memberId", memberId);
            startActivityForResult(intent, REQUEST_CODE);
        }

        @JavascriptInterface
        public void infoMember(String memberId) {
            Log.e("ToDistry: ", "Info Member...");
            Intent intent = new Intent(TreeWebviewAcivity.this, MemberInfoActivity.class);
            intent.putExtra("memberId", memberId);
            startActivity(intent);
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
        RequestQueue requestQueue = Volley.newRequestQueue(this);
        StringRequest stringRequest = new StringRequest(Request.Method.POST, ApiConstants.GET_TREE_DETAILS,
                response -> {
                    try {
                        Log.e("ToDistry: ", "Response: " + response);
                        JSONObject jsonObject = new JSONObject(response);
                        Log.e("ToDistry: ", "Tree URL: " + jsonObject.getString("url"));
                        treeUrl = jsonObject.getString("url");
                        treeWebView.loadUrl(jsonObject.getString("url"));
                        txtTreeName.setText(jsonObject.getJSONObject("data").getString("treeName"));
                    } catch (JSONException e) {
                        progressIndicator.setVisibility(View.GONE);
                        treeWebView.setVisibility(View.GONE);
                        rlPublishTree.setVisibility(View.GONE);
                        e.printStackTrace();
                        Helper.dismissProgressDialog();
                        Utility.showToastMessage(TreeWebviewAcivity.this, e.getMessage());
                    }
                }, error -> {
            progressIndicator.setVisibility(View.GONE);
            treeWebView.setVisibility(View.GONE);
            rlPublishTree.setVisibility(View.GONE);
            Utility.showToastMessage(TreeWebviewAcivity.this, error.getMessage());
        }) {
            @Override
            public Map<String, String> getParams() {
                return new HashMap<>();
            }

            @Override
            public Map<String, String> getHeaders() {
                Map<String, String> params = new HashMap<>();
                params.put("accesstoken", Helper.getPreferenceData(TreeWebviewAcivity.this, "AccessToken"));
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

    @SuppressLint("NonConstantResourceId")
    void showDialogForRelationSelection(String parentId, boolean isShowParents) {
        memberType = "";
        familyRelationSelectionDialog = new Dialog(TreeWebviewAcivity.this);
        familyRelationSelectionDialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
        familyRelationSelectionDialog.setCancelable(true);
        familyRelationSelectionDialog.setContentView(R.layout.family_member_dialog);
        familyRelationSelectionDialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
        familyRelationSelectionDialog.getWindow().setLayout(WindowManager.LayoutParams.MATCH_PARENT, WindowManager.LayoutParams.WRAP_CONTENT);
        RadioGroup radioGroup = familyRelationSelectionDialog.findViewById(R.id.radioGroup);
        RadioButton rbParent = familyRelationSelectionDialog.findViewById(R.id.rbParent);
        RelativeLayout rlSubmit = familyRelationSelectionDialog.findViewById(R.id.rlSubmit);
        if (isShowParents) {
            rbParent.setVisibility(View.VISIBLE);
        } else {
            rbParent.setVisibility(View.GONE);
        }
        radioGroup.setOnCheckedChangeListener((group, checkedId) -> {
            switch (checkedId) {
                case R.id.rbParent:
                    memberType = "Parents";
                    break;
                case R.id.rbSiblings:
                    memberType = "Siblings";
                    break;
                case R.id.rbChild:
                    memberType = "Child";
                    break;
                case R.id.rbSpouse:
                    memberType = "Spouse";
                    break;
                default:
                    memberType = "";
                    break;
            }
        });
        rlSubmit.setOnClickListener(v -> {
            if (memberType.isEmpty()) {
                Utility.showToastMessage(TreeWebviewAcivity.this, "Please Select Member Type");
                return;
            }
            if (memberType.equals("Siblings") && siblingType.isEmpty()) {
                showSiblingDialog(parentId);
            } else {
                familyRelationSelectionDialog.dismiss();
                Intent intent = new Intent(TreeWebviewAcivity.this, AddFamilyMemberActivity.class);
                intent.putExtra("memberType", memberType);
                intent.putExtra("siblingType", siblingType);
                intent.putExtra("parentId", parentId);
                startActivityForResult(intent, REQUEST_CODE);
            }
        });
        familyRelationSelectionDialog.show();
    }


    @SuppressLint("NonConstantResourceId")
    public void showSiblingDialog(String parentId) {
        siblingType = "";
        siblingSelectionDialog = new Dialog(TreeWebviewAcivity.this);
        siblingSelectionDialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
        siblingSelectionDialog.setCancelable(true);
        siblingSelectionDialog.setContentView(R.layout.add_new_sibilingsform);
        siblingSelectionDialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
        siblingSelectionDialog.getWindow().setLayout(WindowManager.LayoutParams.MATCH_PARENT, WindowManager.LayoutParams.WRAP_CONTENT);
        RadioGroup radioGroupSibilng = siblingSelectionDialog.findViewById(R.id.radioGroupSibilng);
        RelativeLayout rlSubmit = siblingSelectionDialog.findViewById(R.id.rlSubmit);
//        radioGroupSibilng.setOnCheckedChangeListener((group, checkedId) -> {
//            switch (checkedId) {
//                case R.id.rbDiffParents:
//                    siblingType = "diffrentParent";
//                    break;
//                case R.id.rbSameParents:
//                    siblingType = "sameParent";
//                    break;
//            }
//        });
        rlSubmit.setOnClickListener(v -> {
            if (radioGroupSibilng.getCheckedRadioButtonId() == R.id.rbDiffParents) {
                siblingType = "diffrentParent";
            } else if (radioGroupSibilng.getCheckedRadioButtonId() == R.id.rbSameParents) {
                siblingType = "sameParent";
            } else {
                siblingType = "";
            }
            if (siblingType.isEmpty()) {
                Utility.showToastMessage(TreeWebviewAcivity.this, "Please Select Sibling Type");
                return;
            }

            familyRelationSelectionDialog.dismiss();
            siblingSelectionDialog.dismiss();
            Intent intent = new Intent(TreeWebviewAcivity.this, AddFamilyMemberActivity.class);
            intent.putExtra("memberType", memberType);
            intent.putExtra("siblingType", siblingType);
            intent.putExtra("parentId", parentId);
            startActivityForResult(intent, REQUEST_CODE);
        });

        siblingSelectionDialog.show();
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == REQUEST_CODE && resultCode == RESULT_OK) {
            boolean isTreeRefresh = data.getBooleanExtra("isTreeRefresh", false);
            if (isTreeRefresh) {
                treeWebView.reload();
            }
        }
    }
}