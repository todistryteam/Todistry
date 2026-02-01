package com.todistory.ui.activity.createfamily;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.WindowManager;

import androidx.appcompat.app.AppCompatActivity;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.android.material.tabs.TabLayout;
import com.google.gson.Gson;
import com.squareup.picasso.Picasso;
import com.todistory.R;
import com.todistory.api.ApiConstants;
import com.todistory.common.Helper;
import com.todistory.databinding.ActivityAdminProfileBinding;
import com.todistory.model.MemberInfoModel;
import com.todistory.model.SuffixModel;
import com.todistory.ui.activity.TreeWebviewAcivity;
import com.todistory.ui.helper.Utility;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class AdminProfileActivity extends AppCompatActivity {

    ActivityAdminProfileBinding binding;
    String memberId = "";
    private List<SuffixModel> suffixList;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        binding = ActivityAdminProfileBinding.inflate(getLayoutInflater());
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
        binding.imgClose.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onBackPressed();
            }
        });
        binding.rlAddRelatives.setOnClickListener(v -> {
            Intent intent = new Intent(AdminProfileActivity.this, TreeWebviewAcivity.class);
            startActivity(intent);
        });
        binding.tab.addTab(binding.tab.newTab().setText("Personal Info"));
        binding.tab.addTab(binding.tab.newTab().setText("Contact Info"));
        binding.tab.addTab(binding.tab.newTab().setText("Biographical Info"));
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
        getMemberDetails();
    }

    private void getMemberDetails() {
        Helper.showProgressDialog(AdminProfileActivity.this, getString(R.string.please_wait));
        RequestQueue requestQueue = Volley.newRequestQueue(this);
        @SuppressLint("SetTextI18n") StringRequest stringRequest = new StringRequest(Request.Method.POST, ApiConstants.GET_MEMBER_DETAILS,
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

                        if (memberInfoModel.getData().getFirstName() != null) {
                            binding.txtChoosePersonName.setText(memberInfoModel.getData().getFirstName());
                        }
                        if (memberInfoModel.getData().getFirstName() != null) {
                            binding.txtShowFirstName.setText(memberInfoModel.getData().getFirstName());
                        }
                        if (memberInfoModel.getData().getLastName() != null) {
                            binding.txtShowLastName.setText(memberInfoModel.getData().getLastName());
                        }
                        if (memberInfoModel.getData().getGender() != null) {
                            binding.txtShowGender.setText(Utility.getGenderName(memberInfoModel.getData().getGender()));
                        }
                        if (memberInfoModel.getData().getBirthDate() != null) {
                            binding.txtBirthDate.setText(memberInfoModel.getData().getBirthDate());
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
                        if (memberInfoModel.getData().getNameSuffix() != null) {
                            for (int i=0; i<suffixList.size();i++){
                                if(suffixList.get(i).getValue().equals(memberInfoModel.getData().getNameSuffix())){
                                    binding.txtShowSuffix.setText(suffixList.get(i).getLabel());
                                    break;
                                }
                            }
                        }
                        if (memberInfoModel.getData().getBirthDay() != null){
                            if(memberInfoModel.getData().getBirthDay().equals("A")){
                                binding.txtPersonStatus.setText("Alive");
                            }else if(memberInfoModel.getData().getBirthDay().equals("D")){
                                binding.txtPersonStatus.setText("Deceased");
                            }
                        }

                        if(memberInfoModel.getData().getSteetNumber() != null){
                            binding.txtStreetNumber.setText(memberInfoModel.getData().getSteetNumber());
                        }
                        if(memberInfoModel.getData().getAptNumber() != null){
                            binding.txtAptOrUnitNumber.setText(memberInfoModel.getData().getAptNumber());
                        }
                        if(memberInfoModel.getData().getCity() != null){
                            binding.txtCity.setText(memberInfoModel.getData().getCity());
                        }
                        if(memberInfoModel.getData().getState() != null){
                            binding.txtState.setText(memberInfoModel.getData().getState());
                        }
                        if(memberInfoModel.getData().getZipCode() != null){
                            binding.txtZipCode.setText(memberInfoModel.getData().getZipCode());
                        }

                        if(memberInfoModel.getData().getBirthFirstName() != null){
                            binding.txtBirthFirstName.setText(memberInfoModel.getData().getBirthFirstName());
                        }
                        if(memberInfoModel.getData().getBirthLastName() != null){
                            binding.txtBirthLastName.setText(memberInfoModel.getData().getBirthLastName());
                        }
                        if(memberInfoModel.getData().getNickNameSuffix() != null){
                            for (int i=0; i<suffixList.size();i++){
                                if(suffixList.get(i).getValue().equals(memberInfoModel.getData().getNickNameSuffix())){
                                    binding.txtNickNameSuffix.setText(suffixList.get(i).getLabel());
                                    break;
                                }
                            }
                        }
                        if(memberInfoModel.getData().getNickName() != null){
                            binding.txtNickName.setText(memberInfoModel.getData().getNickName());
                        }

                        Helper.dismissProgressDialog();
                    } catch (JSONException e) {
                        e.printStackTrace();
                        Helper.dismissProgressDialog();
                        Utility.showToastMessage(AdminProfileActivity.this, e.getMessage());
                    }
                }, error -> {
            Helper.dismissProgressDialog();
            Utility.showToastMessage(AdminProfileActivity.this, error.getMessage());
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
                params.put("accesstoken", Helper.getPreferenceData(AdminProfileActivity.this, "AccessToken"));
                return params;
            }
        };
        requestQueue.add(stringRequest);
    }

    void initSuffix() {
        suffixList = new ArrayList<>();
        suffixList.add(new SuffixModel("", "Select Suffix"));
        suffixList.add(new SuffixModel("sr", "Sr."));
        suffixList.add(new SuffixModel("jr", "Jr."));
        suffixList.add(new SuffixModel("i", "I"));
        suffixList.add(new SuffixModel("ii", "II"));
        suffixList.add(new SuffixModel("iii", "III"));
        suffixList.add(new SuffixModel("iv", "IV"));
        suffixList.add(new SuffixModel("v", "V"));
        suffixList.add(new SuffixModel("vi", "VI"));
        suffixList.add(new SuffixModel("vii", "VII"));
        suffixList.add(new SuffixModel("viii", "VIII"));
        suffixList.add(new SuffixModel("ix", "IX"));
        suffixList.add(new SuffixModel("x", "X"));
        suffixList.add(new SuffixModel("esq", "Esq."));
        suffixList.add(new SuffixModel("phd", "Ph.D."));
        suffixList.add(new SuffixModel("md", "M.D."));
        suffixList.add(new SuffixModel("dds", "D.D.S."));
        suffixList.add(new SuffixModel("jd", "J.D."));
        suffixList.add(new SuffixModel("dvm", "D.V.M."));
        suffixList.add(new SuffixModel("mba", "MBA"));
        suffixList.add(new SuffixModel("ms", "M.S."));
        suffixList.add(new SuffixModel("ma", "M.A."));
        suffixList.add(new SuffixModel("mdiv", "M.Div."));
        suffixList.add(new SuffixModel("rn", "R.N."));
        suffixList.add(new SuffixModel("cpa", "CPA"));
        suffixList.add(new SuffixModel("pe", "P.E."));
        suffixList.add(new SuffixModel("reverend", "Reverend"));
        suffixList.add(new SuffixModel("bishop", "Bishop"));
        suffixList.add(new SuffixModel("pastor", "Pastor"));
        suffixList.add(new SuffixModel("rabbi", "Rabbi"));
        suffixList.add(new SuffixModel("imam", "Imam"));
        suffixList.add(new SuffixModel("capt", "Capt."));
        suffixList.add(new SuffixModel("lt", "Lt."));
        suffixList.add(new SuffixModel("major", "Major"));
        suffixList.add(new SuffixModel("col", "Col."));
        suffixList.add(new SuffixModel("general", "General"));
        suffixList.add(new SuffixModel("admiral", "Admiral"));
        suffixList.add(new SuffixModel("hon", "Hon."));
        suffixList.add(new SuffixModel("amb", "Amb."));
        suffixList.add(new SuffixModel("prof", "Prof."));
        suffixList.add(new SuffixModel("dr", "Dr."));
    }
}