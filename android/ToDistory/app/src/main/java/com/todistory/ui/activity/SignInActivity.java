package com.todistory.ui.activity;

import android.content.Intent;
import android.os.Bundle;
import android.text.InputType;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.todistory.R;
import com.todistory.api.ApiConstants;
import com.todistory.common.Helper;
import com.todistory.databinding.ActivitySignInBinding;
import com.todistory.ui.activity.home.HomeActivity;
import com.todistory.ui.helper.Utility;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class SignInActivity extends AppCompatActivity {
    ActivitySignInBinding binding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivitySignInBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
        binding.rlSignuP.setOnClickListener(v -> {
            Intent intent = new Intent(this, AdminSignupActivity.class);
            startActivity(intent);
        });

        binding.edtPassword.setEndIconOnClickListener(v -> {
            if (binding.edtPasswordInput.getInputType() == (InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_PASSWORD)) {
                binding.edtPasswordInput.setInputType(InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_VISIBLE_PASSWORD);
            } else {
                binding.edtPasswordInput.setInputType(InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_PASSWORD);
            }
            binding.edtPasswordInput.setSelection(binding.edtPasswordInput.getText().length());
        });

        binding.rlLogin.setOnClickListener(v -> {
            if (binding.edtEmail.getEditText().getText().toString().equals("")) {
                binding.edtEmail.requestFocus();
                binding.edtEmail.setError(getString(R.string.enter_email));
            } else if (!Utility.isValidEmail(binding.edtEmail.getEditText().getText().toString())) {
                binding.edtEmail.requestFocus();
                binding.edtEmail.setError(getString(R.string.valid_email_address_required));
            } else if (binding.edtPassword.getEditText().getText().toString().equals("")) {
                binding.edtPassword.requestFocus();
                binding.edtPassword.setError(getString(R.string.enter_password));
            } else {
                doLogin(v);
            }
        });
    }

    public void showToastMessage(String msg) {
        Toast.makeText(this, msg, Toast.LENGTH_LONG).show();
    }

    void doLogin(View view) {
        Helper.hideKeyboard(this, view);
        if (Helper.isNetworkAvailable(this)) {
            Helper.showProgressDialog(this, getString(R.string.please_wait));
            RequestQueue requestQueue = Volley.newRequestQueue(this);
            JSONObject jsonParams = new JSONObject();
            try {
                jsonParams.put("email", binding.edtEmail.getEditText().getText().toString());
                jsonParams.put("password", binding.edtPassword.getEditText().getText().toString());
            } catch (JSONException e) {
                e.printStackTrace();
            }
            JsonObjectRequest jsonRequest = new JsonObjectRequest(Request.Method.POST, ApiConstants.SIGN_IN, jsonParams,
                    response -> {
                        try {
                            JSONObject jsonObject = new JSONObject(response.toString());
                            Log.e("ToDistry: ", "Response: "+jsonObject);
                            if(jsonObject.getString("success").equals("0")){
                                Helper.dismissProgressDialog();
                                Utility.showToastMessage(this, jsonObject.getString("message"));
                            }else{
                                Helper.saveBooleanPreferenceData(this, "IsSignUp", true);
                                Helper.savePreferenceData(this, "AdminFirstName", jsonObject.getJSONObject("data").get("firstName").toString());
                                Helper.savePreferenceData(this, "AdminLastName", jsonObject.getJSONObject("data").get("lastName").toString());
                                Helper.savePreferenceData(this, "AdminMemberId", jsonObject.getJSONObject("data").get("id").toString());
                                Helper.savePreferenceData(this, "AccessToken", jsonObject.getJSONObject("data").get("accesstoken").toString());
                                Helper.savePreferenceData(this, "UserImage", jsonObject.getJSONObject("data").get("image").toString());
                                Helper.savePreferenceData(this, "UserEmail", jsonObject.getJSONObject("data").get("email").toString());
                                Helper.dismissProgressDialog();
                                Intent intent = new Intent(this, HomeActivity.class);
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