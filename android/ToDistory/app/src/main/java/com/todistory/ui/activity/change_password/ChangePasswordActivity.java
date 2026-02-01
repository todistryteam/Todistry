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
import com.todistory.databinding.ActivityChangePasswordBinding;
import com.todistory.ui.activity.BaseActivity;
import com.todistory.ui.helper.Utility;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class ChangePasswordActivity extends BaseActivity {
    ActivityChangePasswordBinding binding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityChangePasswordBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
        binding.ivBack.setOnClickListener(v -> onBackPressed());
        binding.rlSubmit.setOnClickListener(v -> {
            if (binding.edtEmail.getEditText().getText().toString().equals("")) {
                binding.edtEmail.requestFocus();
                binding.edtEmail.setError(getString(R.string.enter_email));
            } else if (!Utility.isValidEmail(binding.edtEmail.getEditText().getText().toString())) {
                binding.edtEmail.requestFocus();
                binding.edtEmail.setError(getString(R.string.valid_email_address_required));
            } else {
                resetPassword(v);
            }
        });
    }

    void resetPassword(View view) {
        Helper.hideKeyboard(this, view);
        if (Helper.isNetworkAvailable(this)) {
            Helper.showProgressDialog(this, getString(R.string.please_wait));
            RequestQueue requestQueue = Volley.newRequestQueue(this);
            JSONObject jsonParams = new JSONObject();
            try {
                jsonParams.put("email", binding.edtEmail.getEditText().getText().toString());
            } catch (JSONException e) {
                e.printStackTrace();
            }
            JsonObjectRequest jsonRequest = new JsonObjectRequest(Request.Method.POST, ApiConstants.GET_OTP_CHANGE_PASSWORD, jsonParams,
                    response -> {
                        try {
                            JSONObject jsonObject = new JSONObject(response.toString());
                            Helper.dismissProgressDialog();
                            if (jsonObject.getString("success").equals("0")) {
                                Utility.showToastMessage(this, jsonObject.getString("message"));
                            } else {
                                Utility.showToastMessage(this, jsonObject.getString("message"));
                                Intent intent = new Intent(this, ChangePasswordOTPActivity.class);
                                intent.putExtra("email", binding.edtEmail.getEditText().getText().toString());
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