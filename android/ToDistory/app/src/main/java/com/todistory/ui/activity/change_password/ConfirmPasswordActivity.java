package com.todistory.ui.activity.change_password;

import android.content.Intent;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.todistory.R;
import com.todistory.api.ApiConstants;
import com.todistory.common.Helper;
import com.todistory.databinding.ActivityConfirmPasswordBinding;
import com.todistory.ui.activity.BaseActivity;
import com.todistory.ui.activity.SignInActivity;
import com.todistory.ui.helper.Utility;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class ConfirmPasswordActivity extends BaseActivity {

    ActivityConfirmPasswordBinding binding;
    String otp = "", id = "";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityConfirmPasswordBinding.inflate(getLayoutInflater());
        if (getIntent().hasExtra("id")) {
            id = getIntent().getStringExtra("id");
        }
        if (getIntent().hasExtra("otp")) {
            otp = getIntent().getStringExtra("otp");
        }
        setContentView(binding.getRoot());

        binding.ivBack.setOnClickListener(v -> onBackPressed());
        binding.edtPassword.getEditText().addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {
            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
            }

            @Override
            public void afterTextChanged(Editable editable) {
                String password = editable.toString();

                StringBuilder errorBuilder = new StringBuilder();

                if (password.length() < 8) {
                    errorBuilder.append(getString(R.string.minimum_8_characters));
                }
                if (!password.matches(".*[0-9].*")) {
                    errorBuilder.append(getString(R.string.at_least_one_number));
                }
                if (!password.matches(".*[!@#$%^&*()_+=\\-{}|:;\"'<>,.?/~`].*")) {
                    errorBuilder.append(getString(R.string.at_least_one_special_character));
                }
                if (!password.matches(".*[A-Z].*")) {
                    errorBuilder.append(getString(R.string.at_least_one_uppercase_letter));
                }

                if (errorBuilder.length() > 0) {
                    binding.edtPassword.setError(errorBuilder.toString().trim());
                } else {
                    binding.edtPassword.setError(null);
                }
            }
        });

        binding.rlSubmit.setOnClickListener(v -> {
            if (binding.edtPassword.getEditText().getText().toString().equals("")) {
                binding.edtPassword.requestFocus();
                binding.edtPassword.setError(getString(R.string.enter_password));
            } else if (binding.edtConfirmPassword.getEditText().getText().toString().equals("")) {
                binding.edtConfirmPassword.requestFocus();
                binding.edtConfirmPassword.setError(getString(R.string.enter_confirm_password));
            } else if (!binding.edtPassword.getEditText().getText().toString().equals(binding.edtConfirmPassword.getEditText().getText().toString())) {
                binding.edtConfirmPassword.requestFocus();
                binding.edtConfirmPassword.setError(getString(R.string.password_and_confirm_password_doesnt_match));
            } else {
                updatePassword(v);
            }
        });
    }

    void updatePassword(View view) {
        Helper.hideKeyboard(this, view);
        if (Helper.isNetworkAvailable(this)) {
            Helper.showProgressDialog(this, getString(R.string.please_wait));
            RequestQueue requestQueue = Volley.newRequestQueue(this);
            JSONObject jsonParams = new JSONObject();
            try {
                jsonParams.put("id", id);
                jsonParams.put("resetPasswordCode", otp);
                jsonParams.put("password", binding.edtPassword.getEditText().getText().toString());
            } catch (JSONException e) {
                e.printStackTrace();
            }
            JsonObjectRequest jsonRequest = new JsonObjectRequest(Request.Method.POST, ApiConstants.UPDATE_PASSWORD, jsonParams,
                    response -> {
                        try {
                            JSONObject jsonObject = new JSONObject(response.toString());
                            Helper.dismissProgressDialog();
                            if (jsonObject.getString("success").equals("0")) {
                                Utility.showToastMessage(this, jsonObject.getString("message"));
                            } else {
                                Utility.showToastMessage(this, jsonObject.getString("message"));
                                Intent intent = new Intent(this, SignInActivity.class);
                                startActivity(intent);
                                finishAffinity();
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