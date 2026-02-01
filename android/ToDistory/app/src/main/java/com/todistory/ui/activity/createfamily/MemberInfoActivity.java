package com.todistory.ui.activity.createfamily;

import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.TextView;

import androidx.appcompat.app.AlertDialog;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.android.material.tabs.TabLayout;
import com.google.gson.Gson;
import com.squareup.picasso.Picasso;
import com.todistory.R;
import com.todistory.api.ApiConstants;
import com.todistory.common.Helper;
import com.todistory.databinding.ActivityMemberInfoBinding;
import com.todistory.model.MemberInfoModel;
import com.todistory.model.SuffixModel;
import com.todistory.ui.activity.BaseActivity;
import com.todistory.ui.helper.Utility;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MemberInfoActivity extends BaseActivity {
    ActivityMemberInfoBinding binding;
    String memberId = "";
    private List<SuffixModel> suffixList;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        binding = ActivityMemberInfoBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            getWindow().getAttributes().layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;
            getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
        }
        Bundle bundle = getIntent().getExtras();
        memberId = bundle.getString("memberId");
        initSuffix();
        binding.llShowPersonalInfo.setVisibility(View.VISIBLE);
        binding.llShowContactInfo.setVisibility(View.GONE);
        binding.llShowBiographicalInfo.setVisibility(View.GONE);
        binding.imgClose.setOnClickListener(v -> onBackPressed());
        binding.tab.addTab(binding.tab.newTab().setText(getString(R.string.personal_info)));
        binding.tab.addTab(binding.tab.newTab().setText(getString(R.string.contact_info)));
        binding.tab.addTab(binding.tab.newTab().setText(getString(R.string.biographical_info)));
        binding.tab.addOnTabSelectedListener(new TabLayout.OnTabSelectedListener() {
            @Override
            public void onTabSelected(TabLayout.Tab tab) {
                if (tab.getPosition() == 0) {
                    binding.llShowPersonalInfo.setVisibility(View.VISIBLE);
                    binding.llShowContactInfo.setVisibility(View.GONE);
                    binding.llShowBiographicalInfo.setVisibility(View.GONE);
                } else if (tab.getPosition() == 1) {
                    binding.llShowPersonalInfo.setVisibility(View.GONE);
                    binding.llShowContactInfo.setVisibility(View.VISIBLE);
                    binding.llShowBiographicalInfo.setVisibility(View.GONE);
                } else if (tab.getPosition() == 2) {
                    binding.llShowPersonalInfo.setVisibility(View.GONE);
                    binding.llShowContactInfo.setVisibility(View.GONE);
                    binding.llShowBiographicalInfo.setVisibility(View.VISIBLE);
                } else {
                    binding.llShowPersonalInfo.setVisibility(View.VISIBLE);
                    binding.llShowContactInfo.setVisibility(View.GONE);
                    binding.llShowBiographicalInfo.setVisibility(View.GONE);
                }
            }

            @Override
            public void onTabUnselected(TabLayout.Tab tab) {

            }

            @Override
            public void onTabReselected(TabLayout.Tab tab) {

            }
        });
        binding.rlDelete.setOnClickListener(v -> new AlertDialog.Builder(MemberInfoActivity.this)
                .setTitle(getString(R.string.are_you_sure))
                .setMessage(getString(R.string.deleting_this_person_will_remove_all_connected_descendants_proceed))
                .setPositiveButton(getString(R.string.yes_delete_it), (dialog, which) -> {
                    removeMember();
                })
                .setNegativeButton(getString(R.string.cancel), null)
                .show());
        getMemberDetails();
    }

    private void getMemberDetails() {
        Helper.showProgressDialog(MemberInfoActivity.this, getString(R.string.please_wait));
        RequestQueue requestQueue = Volley.newRequestQueue(this);
        StringRequest stringRequest = new StringRequest(Request.Method.POST, ApiConstants.GET_MEMBER_DETAILS,
                response -> {
                    try {
                        JSONObject jsonObject = new JSONObject(response);
                        Log.e("ToDistry: ", "Response: " + jsonObject);
                        Gson gson = new Gson();
                        MemberInfoModel memberInfoModel = gson.fromJson(response, MemberInfoModel.class);
                        if (memberInfoModel.getData().getImage() != null && !memberInfoModel.getData().getImage().isEmpty()) {
                            Picasso.get()
                                    .load(memberInfoModel.getData().getImage())
                                    .placeholder(R.drawable.user)
                                    .error(R.drawable.user)
                                    .resize(200, 200)
                                    .centerCrop()
                                    .into(binding.imgProfilePic);
                        }

                        if(memberInfoModel.getData().isIsdeletebutton()){
                            binding.rlDelete.setVisibility(View.VISIBLE);
                        }else{
                            binding.rlDelete.setVisibility(View.GONE);
                        }

                        if (memberInfoModel.getData().getFirstName() != null) {
                            binding.txtChoosePersonName.setText(memberInfoModel.getData().getFirstName());
                        }

                        if (memberInfoModel.getData().getFirstName() != null) {
                            binding.txtShowFirstName.setText(memberInfoModel.getData().getFirstName());
                        }
                        if (memberInfoModel.getData().getMiddleName() != null) {
                            binding.txtShowMiddleName.setText(memberInfoModel.getData().getMiddleName());
                        }
                        if (memberInfoModel.getData().getLastName() != null) {
                            binding.txtShowLastName.setText(memberInfoModel.getData().getLastName());
                        }
                        if (memberInfoModel.getData().getNameSuffix() != null) {
                            for (int i = 0; i < suffixList.size(); i++) {
                                if (suffixList.get(i).getValue().equals(memberInfoModel.getData().getNameSuffix())) {
                                    binding.txtSuffix.setText(suffixList.get(i).getLabel());
                                    break;
                                }
                            }
                        }
                        if (memberInfoModel.getData().getGender() != null) {
                            binding.txtShowGender.setText(Utility.getGenderName(memberInfoModel.getData().getGender()));
                        }
                        if (memberInfoModel.getData().getBirthDate() != null) {
                            binding.txtBirthDate.setText(Helper.getBirthDate(memberInfoModel.getData().getBirthDate()));
                        }

                        if (memberInfoModel.getData().getEmail() != null) {
                            binding.txtEmail.setText(memberInfoModel.getData().getEmail());
                        }
                        if (memberInfoModel.getData().getWebsite() != null) {
                            binding.txtWebsite.setText(memberInfoModel.getData().getWebsite());
                        }
                        if (memberInfoModel.getData().getBlog() != null) {
                            binding.txtBlog.setText(memberInfoModel.getData().getBlog());
                        }
                        if (memberInfoModel.getData().getHomePhone() != null) {
                            binding.txtHomePhoneNumber.setText(memberInfoModel.getData().getHomePhone());
                        }
                        if (memberInfoModel.getData().getWorkPhone() != null) {
                            binding.txtWorkPhoneNumber.setText(memberInfoModel.getData().getWorkPhone());
                        }
                        if (memberInfoModel.getData().getMobile() != null) {
                            binding.txtMobile.setText(memberInfoModel.getData().getMobile());
                        }

                        if (memberInfoModel.getData().getProfession() != null) {
                            binding.txtProfession.setText(memberInfoModel.getData().getProfession());
                        }
                        if (memberInfoModel.getData().getCompany() != null) {
                            binding.txtCompany.setText(memberInfoModel.getData().getCompany());
                        }
                        if (memberInfoModel.getData().getInterests() != null) {
                            binding.txtInterests.setText(memberInfoModel.getData().getInterests());
                        }
                        if (memberInfoModel.getData().getActivities() != null) {
                            binding.txtActivities.setText(memberInfoModel.getData().getActivities());
                        }
                        if (memberInfoModel.getData().getBioNotes() != null) {
                            binding.txtBioNotes.setText(memberInfoModel.getData().getBioNotes());
                        }

                        if (memberInfoModel.getData().getSteetNumber() != null) {
                            binding.txtStreetNumber.setText(memberInfoModel.getData().getSteetNumber());
                        }
                        if (memberInfoModel.getData().getAptNumber() != null) {
                            binding.txtAptOrUnitNumber.setText(memberInfoModel.getData().getAptNumber());
                        }
                        if (memberInfoModel.getData().getCity() != null) {
                            binding.txtCity.setText(memberInfoModel.getData().getCity());
                        }
                        if (memberInfoModel.getData().getState() != null) {
                            binding.txtState.setText(memberInfoModel.getData().getState());
                        }
                        if (memberInfoModel.getData().getZipCode() != null) {
                            binding.txtZipCode.setText(memberInfoModel.getData().getZipCode());
                        }
                        if (memberInfoModel.getData().getBirthFirstName() != null) {
                            binding.txtBirthFirstName.setText(memberInfoModel.getData().getBirthFirstName());
                        }
                        if (memberInfoModel.getData().getBirthLastName() != null) {
                            binding.txtBirthLastName.setText(memberInfoModel.getData().getBirthLastName());
                        }
                        if (memberInfoModel.getData().getNickNameSuffix() != null) {
                            for (int i = 0; i < suffixList.size(); i++) {
                                if (suffixList.get(i).getValue().equals(memberInfoModel.getData().getNickNameSuffix())) {
                                    binding.txtNickNameSuffix.setText(suffixList.get(i).getLabel());
                                    break;
                                }
                            }
                        }
                        if (memberInfoModel.getData().getNickName() != null) {
                            binding.txtNickName.setText(memberInfoModel.getData().getNickName());
                        }
                        if (memberInfoModel.getData().getBirthDay() != null) {
                            if (memberInfoModel.getData().getBirthDay().equals("A")) {
                                binding.txtPersonStatus.setText("Alive");
                            } else if (memberInfoModel.getData().getBirthDay().equals("D")) {
                                binding.txtPersonStatus.setText("Deceased");
                            }
                        }

                        Helper.dismissProgressDialog();
                    } catch (JSONException e) {
                        e.printStackTrace();
                        Helper.dismissProgressDialog();
                        Utility.showToastMessage(MemberInfoActivity.this, e.getMessage());
                    }
                }, error -> {
            Helper.dismissProgressDialog();
            Utility.showToastMessage(MemberInfoActivity.this, error.getMessage());
        }) {
            @Override
            public Map<String, String> getParams() {
                Map<String, String> params = new HashMap<>();
                params.put("id", memberId);
                return params;
            }

            @Override
            public Map<String, String> getHeaders() {
                Map<String, String> params = new HashMap<>();
                params.put("accesstoken", Helper.getPreferenceData(MemberInfoActivity.this, "AccessToken"));
                return params;
            }
        };
        requestQueue.add(stringRequest);
    }

    void initSuffix() {
        suffixList = new ArrayList<>();
        suffixList.add(new SuffixModel("", getString(R.string.select_suffix)));
        suffixList.add(new SuffixModel("sr", getString(R.string.suffix_sr)));
        suffixList.add(new SuffixModel("jr", getString(R.string.suffix_jr)));
        suffixList.add(new SuffixModel("i", getString(R.string.suffix_i)));
        suffixList.add(new SuffixModel("ii", getString(R.string.suffix_ii)));
        suffixList.add(new SuffixModel("iii", getString(R.string.suffix_iii)));
        suffixList.add(new SuffixModel("iv", getString(R.string.suffix_iv)));
        suffixList.add(new SuffixModel("v", getString(R.string.suffix_v)));
        suffixList.add(new SuffixModel("vi", getString(R.string.suffix_vi)));
        suffixList.add(new SuffixModel("vii", getString(R.string.suffix_vii)));
        suffixList.add(new SuffixModel("viii", getString(R.string.suffix_viii)));
        suffixList.add(new SuffixModel("ix", getString(R.string.suffix_ix)));
        suffixList.add(new SuffixModel("x", getString(R.string.suffix_x)));
        suffixList.add(new SuffixModel("esq", getString(R.string.suffix_esq)));
        suffixList.add(new SuffixModel("phd", getString(R.string.suffix_phd)));
        suffixList.add(new SuffixModel("md", getString(R.string.suffix_md)));
        suffixList.add(new SuffixModel("dds", getString(R.string.suffix_dds)));
        suffixList.add(new SuffixModel("jd", getString(R.string.suffix_jd)));
        suffixList.add(new SuffixModel("dvm", getString(R.string.suffix_dvm)));
        suffixList.add(new SuffixModel("mba", getString(R.string.suffix_mba)));
        suffixList.add(new SuffixModel("ms", getString(R.string.suffix_ms)));
        suffixList.add(new SuffixModel("ma", getString(R.string.suffix_ma)));
        suffixList.add(new SuffixModel("mdiv", getString(R.string.suffix_mdiv)));
        suffixList.add(new SuffixModel("rn", getString(R.string.suffix_rn)));
        suffixList.add(new SuffixModel("cpa", getString(R.string.suffix_cpa)));
        suffixList.add(new SuffixModel("pe", getString(R.string.suffix_pe)));
        suffixList.add(new SuffixModel("reverend", getString(R.string.suffix_reverend)));
        suffixList.add(new SuffixModel("bishop", getString(R.string.suffix_bishop)));
        suffixList.add(new SuffixModel("pastor", getString(R.string.suffix_pastor)));
        suffixList.add(new SuffixModel("rabbi", getString(R.string.suffix_rabbi)));
        suffixList.add(new SuffixModel("imam", getString(R.string.suffix_imam)));
        suffixList.add(new SuffixModel("capt", getString(R.string.suffix_capt)));
        suffixList.add(new SuffixModel("lt", getString(R.string.suffix_lt)));
        suffixList.add(new SuffixModel("major", getString(R.string.suffix_major)));
        suffixList.add(new SuffixModel("col", getString(R.string.suffix_col)));
        suffixList.add(new SuffixModel("general", getString(R.string.suffix_general)));
        suffixList.add(new SuffixModel("admiral", getString(R.string.suffix_admiral)));
        suffixList.add(new SuffixModel("hon", getString(R.string.suffix_hon)));
        suffixList.add(new SuffixModel("amb", getString(R.string.suffix_amb)));
        suffixList.add(new SuffixModel("prof", getString(R.string.suffix_prof)));
        suffixList.add(new SuffixModel("dr", getString(R.string.suffix_dr)));
    }

    void removeMember() {
        if (Helper.isNetworkAvailable(this)) {
            Helper.showProgressDialog(this, getString(R.string.please_wait));
            RequestQueue requestQueue = Volley.newRequestQueue(this);
            JSONObject jsonParams = new JSONObject();
            try {
                jsonParams.put("id", memberId);
            } catch (JSONException e) {
                e.printStackTrace();
            }
            JsonObjectRequest jsonRequest = new JsonObjectRequest(Request.Method.POST, ApiConstants.REMOVE_MEMBER, jsonParams,
                    response -> {
                        try {
                            Log.e("ToDistry: ", "Response: "+response);
                            JSONObject jsonObject = new JSONObject(response.toString());
                            Helper.dismissProgressDialog();
                            if (jsonObject.getString("success").equals("0")) {
                                Utility.showToastMessage(this, jsonObject.getString("message"));
                            } else {
                                showUndoDialog();
                            }
                        } catch (Exception e) {
                            e.printStackTrace();
                            Helper.dismissProgressDialog();
                            Utility.showToastMessage(this, e.getMessage());
                        }
                    },
                    error -> {
                        Helper.dismissProgressDialog();
                        Utility.showToastMessage(this, error.getMessage());
                    }) {
                @Override
                public Map<String, String> getHeaders() {
                    Map<String, String> headers = new HashMap<>();
                    headers.put("Content-Type", "application/json");
                    headers.put("accesstoken", Helper.getPreferenceData(MemberInfoActivity.this, "AccessToken"));
                    return headers;
                }
            };
            requestQueue.add(jsonRequest);
        }
    }

    void showUndoDialog() {
        LayoutInflater inflater = getLayoutInflater();
        View dialogView = inflater.inflate(R.layout.dialog_member_deleted, null);
        AlertDialog.Builder builder = new AlertDialog.Builder(MemberInfoActivity.this);
        builder.setView(dialogView);
        builder.setCancelable(false);
        AlertDialog alertDialog = builder.create();
        alertDialog.show();
        ProgressBar progressBar = dialogView.findViewById(R.id.progressBar);
        TextView countdownText = dialogView.findViewById(R.id.countdownText);
        Button undoButton = dialogView.findViewById(R.id.undoButton);
        progressBar.setMax(15);
        final int[] secondsLeft = {15};
        Handler handler = new Handler();
        Runnable countdownRunnable = new Runnable() {
            @Override
            public void run() {
                secondsLeft[0]--;
                progressBar.setProgress(15 - secondsLeft[0]);
                countdownText.setText(secondsLeft[0] + " "+getString(R.string.seconds_remaining));
                if (secondsLeft[0] > 0) {
                    handler.postDelayed(this, 1000);
                } else {
                    if (alertDialog.isShowing()) {
                        alertDialog.dismiss();
                        Intent resultIntent = new Intent();
                        resultIntent.putExtra("isTreeRefresh", true);
                        setResult(RESULT_OK, resultIntent);
                        finish();
                    }
                }
            }
        };
        handler.postDelayed(countdownRunnable, 1000);
        undoButton.setOnClickListener(v -> {
            handler.removeCallbacks(countdownRunnable);
            alertDialog.dismiss();
            undoMember();
        });
    }


    void undoMember() {
        if (Helper.isNetworkAvailable(this)) {
            Helper.showProgressDialog(this, getString(R.string.please_wait));
            RequestQueue requestQueue = Volley.newRequestQueue(this);
            JSONObject jsonParams = new JSONObject();
            try {
                jsonParams.put("id", memberId);
            } catch (JSONException e) {
                e.printStackTrace();
            }
            JsonObjectRequest jsonRequest = new JsonObjectRequest(Request.Method.POST, ApiConstants.UNDO_MEMBER, jsonParams,
                    response -> {
                        try {
                            Log.e("ToDistry: ", "Response: "+response);
                            JSONObject jsonObject = new JSONObject(response.toString());
                            Helper.dismissProgressDialog();
                            if (jsonObject.getString("success").equals("0")) {
                                Utility.showToastMessage(this, jsonObject.getString("message"));
                            } else {
                                Intent resultIntent = new Intent();
                                resultIntent.putExtra("isTreeRefresh", true);
                                setResult(RESULT_OK, resultIntent);
                                finish();
                            }
                        } catch (Exception e) {
                            e.printStackTrace();
                            Helper.dismissProgressDialog();
                            Utility.showToastMessage(this, e.getMessage());
                        }
                    },
                    error -> {
                        Helper.dismissProgressDialog();
                        Utility.showToastMessage(this, error.getMessage());
                    }) {
                @Override
                public Map<String, String> getHeaders() {
                    Map<String, String> headers = new HashMap<>();
                    headers.put("Content-Type", "application/json");
                    headers.put("accesstoken", Helper.getPreferenceData(MemberInfoActivity.this, "AccessToken"));
                    return headers;
                }
            };
            requestQueue.add(jsonRequest);
        }
    }
}