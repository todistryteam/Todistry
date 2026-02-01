package com.todistory.ui.fragment;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.android.material.tabs.TabLayout;
import com.google.gson.Gson;
import com.todistory.R;
import com.todistory.api.ApiConstants;
import com.todistory.common.Helper;
import com.todistory.databinding.FragmentProfileBinding;
import com.todistory.model.MemberInfoModel;
import com.todistory.model.SuffixModel;
import com.todistory.ui.activity.change_password.ChangePasswordActivity;
import com.todistory.ui.helper.Utility;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ProfileFragment extends Fragment {
    FragmentProfileBinding binding;
    private List<SuffixModel> suffixList;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        binding = FragmentProfileBinding.inflate(inflater, container, false);
        initSuffix();
        binding.llShowContactInfo.setVisibility(View.VISIBLE);
        binding.llShowLoginInfo.setVisibility(View.GONE);
        binding.llShowPaymentInfo.setVisibility(View.GONE);
        binding.llShowBiographicalInfo.setVisibility(View.GONE);

        binding.tab.addTab(binding.tab.newTab().setText(getString(R.string.contact_info)));
        binding.tab.addTab(binding.tab.newTab().setText(getString(R.string.login_info)));
        binding.tab.addTab(binding.tab.newTab().setText(getString(R.string.payment_info)));
        binding.tab.addTab(binding.tab.newTab().setText(getString(R.string.biographical_info)));

        binding.tab.addOnTabSelectedListener(new TabLayout.OnTabSelectedListener() {
            @Override
            public void onTabSelected(TabLayout.Tab tab) {
                if (tab.getPosition() == 0) {
                    binding.llShowContactInfo.setVisibility(View.VISIBLE);
                    binding.llShowLoginInfo.setVisibility(View.GONE);
                    binding.llShowPaymentInfo.setVisibility(View.GONE);
                    binding.llShowBiographicalInfo.setVisibility(View.GONE);
                } else if (tab.getPosition() == 1) {
                    binding.llShowContactInfo.setVisibility(View.GONE);
                    binding.llShowLoginInfo.setVisibility(View.VISIBLE);
                    binding.llShowPaymentInfo.setVisibility(View.GONE);
                    binding.llShowBiographicalInfo.setVisibility(View.GONE);
                } else if (tab.getPosition() == 2) {
                    binding.llShowContactInfo.setVisibility(View.GONE);
                    binding.llShowLoginInfo.setVisibility(View.GONE);
                    binding.llShowPaymentInfo.setVisibility(View.VISIBLE);
                    binding.llShowBiographicalInfo.setVisibility(View.GONE);
                } else {
                    binding.llShowContactInfo.setVisibility(View.GONE);
                    binding.llShowLoginInfo.setVisibility(View.GONE);
                    binding.llShowPaymentInfo.setVisibility(View.GONE);
                    binding.llShowBiographicalInfo.setVisibility(View.VISIBLE);
                }
            }

            @Override
            public void onTabUnselected(TabLayout.Tab tab) {

            }

            @Override
            public void onTabReselected(TabLayout.Tab tab) {

            }
        });

        binding.rlChangePassword.setOnClickListener(v -> {
            Intent intent = new Intent(getActivity(), ChangePasswordActivity.class);
            startActivity(intent);
        });

        getMemberDetails();
        return binding.getRoot();
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


    private void getMemberDetails() {
        Helper.showProgressDialog(getActivity(), getString(R.string.please_wait));
        RequestQueue requestQueue = Volley.newRequestQueue(getActivity());
        Log.e("ToDistry: ", "URL: "+ApiConstants.GET_PROFILE);
        StringRequest stringRequest = new StringRequest(Request.Method.POST, ApiConstants.GET_PROFILE,
                response -> {
                    try {
                        Log.e("ToDistry: ", "Response: "+response);
                        JSONObject jsonObject = new JSONObject(response);
                        if(jsonObject.getString("success").equals("0")){
                            Utility.showToastMessage(getActivity(), jsonObject.getString("message"));
                        }else {
                            Gson gson = new Gson();
                            MemberInfoModel memberInfoModel = gson.fromJson(response, MemberInfoModel.class);

                            if (memberInfoModel.getData().getEmail() != null) {
                                binding.txtEmail.setText(memberInfoModel.getData().getEmail());
                                binding.txtUserEmail.setText(memberInfoModel.getData().getEmail());
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

                        }
                        Helper.dismissProgressDialog();
                    } catch (JSONException e) {
                        e.printStackTrace();
                        Helper.dismissProgressDialog();
                        Utility.showToastMessage(getActivity(), e.getMessage());
                    }
                }, error -> {
            Helper.dismissProgressDialog();
            Utility.showToastMessage(getActivity(), error.getMessage());
        }) {
            @Override
            public Map<String, String> getParams() {
                Map<String, String> params = new HashMap<>();
                params.put("id", Helper.getPreferenceData(getActivity(), "AdminMemberId"));
                Log.e("ToDistry: ", "Params: "+params);
                return params;
            }

            @Override
            public Map<String, String> getHeaders() {
                Map<String, String> params = new HashMap<>();
                params.put("accesstoken", Helper.getPreferenceData(getActivity(), "AccessToken"));
                Log.e("ToDistry: ", "Headers: "+params);
                return params;
            }
        };
        requestQueue.add(stringRequest);
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        // Avoid memory leaks
        binding = null;
    }
}