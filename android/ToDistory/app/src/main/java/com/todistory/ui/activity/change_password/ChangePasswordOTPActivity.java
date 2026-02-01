package com.todistory.ui.activity.change_password;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.todistory.R;
import com.todistory.api.ApiConstants;
import com.todistory.common.Helper;
import com.todistory.databinding.ActivityChangePasswordOtpActivityBinding;
import com.todistory.ui.activity.BaseActivity;
import com.todistory.ui.helper.Utility;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class ChangePasswordOTPActivity extends BaseActivity {

    ActivityChangePasswordOtpActivityBinding binding;
    String email = "";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityChangePasswordOtpActivityBinding.inflate(getLayoutInflater());
        if (getIntent().hasExtra("email")) {
            email = getIntent().getStringExtra("email");
        }
        setContentView(binding.getRoot());
        binding.ivBack.setOnClickListener(v -> onBackPressed());
        binding.rlVerify.setOnClickListener(v -> {
            if (binding.otpView.getText().toString().equals("")) {
                binding.txtOTPErrorMessage.setVisibility(View.VISIBLE);
                binding.txtOTPErrorMessage.setText(getString(R.string.enter_otp));
            } else if (binding.otpView.getText().toString().length() < 6) {
                binding.txtOTPErrorMessage.setVisibility(View.VISIBLE);
                binding.txtOTPErrorMessage.setText(getString(R.string.six_digit_required));
            } else {
                binding.txtOTPErrorMessage.setVisibility(View.GONE);
                verifyOTP(v);
            }
        });
    }


    void verifyOTP(View view) {
        Helper.hideKeyboard(this, view);
        if (Helper.isNetworkAvailable(this)) {
            Helper.showProgressDialog(this, getString(R.string.please_wait));
            RequestQueue requestQueue = Volley.newRequestQueue(this);
            JSONObject jsonParams = new JSONObject();
            try {
                jsonParams.put("email", email);
                jsonParams.put("resetPasswordCode", binding.otpView.getText().toString());
            } catch (JSONException e) {
                e.printStackTrace();
            }
            JsonObjectRequest jsonRequest = new JsonObjectRequest(Request.Method.POST, ApiConstants.VERIFY_OTP, jsonParams,
                    response -> {
                        try {
                            JSONObject jsonObject = new JSONObject(response.toString());
                            Helper.dismissProgressDialog();
                            if (jsonObject.getString("success").equals("0")) {
                                Utility.showToastMessage(this, jsonObject.getString("message"));
                            } else {
                                Utility.showToastMessage(this, jsonObject.getString("message"));
                                Intent intent = new Intent(ChangePasswordOTPActivity.this, ConfirmPasswordActivity.class);
                                intent.putExtra("id", jsonObject.getJSONObject("data").getString("id"));
                                intent.putExtra("otp", binding.otpView.getText().toString());
                                startActivity(intent);
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
                    return headers;
                }
            };
            requestQueue.add(jsonRequest);
        }
    }
}