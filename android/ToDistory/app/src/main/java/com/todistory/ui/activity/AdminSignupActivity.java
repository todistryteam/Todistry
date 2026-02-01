//package com.todistory.ui.activity;
//
//import android.annotation.SuppressLint;
//import android.app.Activity;
//import android.app.DatePickerDialog;
//import android.content.Context;
//import android.content.Intent;
//import android.net.Uri;
//import android.os.Bundle;
//import android.text.TextUtils;
//import android.util.Log;
//import android.view.View;
//import android.view.inputmethod.InputMethodManager;
//import android.widget.ArrayAdapter;
//import android.widget.EditText;
//import android.widget.RadioButton;
//import android.widget.Toast;
//
//import androidx.annotation.Nullable;
//import androidx.appcompat.app.AppCompatActivity;
//
//import com.android.volley.AuthFailureError;
//import com.android.volley.NetworkResponse;
//import com.android.volley.Request;
//import com.android.volley.RequestQueue;
//import com.android.volley.Response;
//import com.android.volley.toolbox.Volley;
//import com.github.dhaval2404.imagepicker.ImagePicker;
//import com.todistory.R;
//import com.todistory.api.ApiConstants;
//import com.todistory.api.VolleyMultipartRequest;
//import com.todistory.common.Helper;
//import com.todistory.databinding.ActivityAdminSignupBinding;
//import com.todistory.ui.helper.Utility;
//
//import org.json.JSONException;
//import org.json.JSONObject;
//
//import java.io.File;
//import java.util.Calendar;
//import java.util.Collections;
//import java.util.HashMap;
//import java.util.Map;
//
//public class AdminSignupActivity extends AppCompatActivity {
//
//    ActivityAdminSignupBinding binding;
//    String gender = "", birthDate = "";
//    Uri userImageURI;
//
//    @Override
//    protected void onCreate(Bundle savedInstanceState) {
//        super.onCreate(savedInstanceState);
//        binding = ActivityAdminSignupBinding.inflate(getLayoutInflater());
//        setContentView(binding.getRoot());
//        actionView();
//    }
//
//    @Override
//    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
//        super.onActivityResult(requestCode, resultCode, data);
//        if (resultCode == Activity.RESULT_OK) {
//            if (data != null) {
//                userImageURI = data.getData();
//                binding.ivUser.setImageURI(userImageURI);
//            }
//        } else if (resultCode == ImagePicker.RESULT_ERROR) {
//            Toast.makeText(this, ImagePicker.getError(data), Toast.LENGTH_SHORT).show();
//        } else {
//            Toast.makeText(this, "Task Cancelled", Toast.LENGTH_SHORT).show();
//        }
//    }
//
//    void setBirthDate() {
//        final Calendar c = Calendar.getInstance();
//        int year = c.get(Calendar.YEAR);
//        int month = c.get(Calendar.MONTH);
//        int day = c.get(Calendar.DAY_OF_MONTH);
//        @SuppressLint("SetTextI18n") DatePickerDialog datePickerDialog = new DatePickerDialog(
//                this,
//                R.style.CalenderDialogTheme,
//                (view, year1, monthOfYear, dayOfMonth) -> binding.edtBirthDate.setText(dayOfMonth + "-" + (monthOfYear + 1) + "-" + year1),
//                year, month, day);
//
//        datePickerDialog.show();
//    }
//
//    public void actionView() {
//        binding.ivHome.setOnClickListener(v -> {
//            Intent intent = new Intent(AdminSignupActivity.this, WelcomeActivity.class);
//            startActivity(intent);
//            finish();
//        });
//
//        binding.ivCalender.setOnClickListener(v -> setBirthDate());
//
//        ArrayAdapter<CharSequence> birthDateDayAdapter = ArrayAdapter.createFromResource(
//                this, R.array.birth_date_day, android.R.layout.simple_spinner_item);
//        birthDateDayAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
//        binding.spnBirthDateDay.setAdapter(birthDateDayAdapter);
//
//
//        ArrayAdapter<CharSequence> birthDateMonthAdapter = ArrayAdapter.createFromResource(
//                this, R.array.birth_date_month, android.R.layout.simple_spinner_item);
//        birthDateMonthAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
//        binding.spnBirthDateMonth.setAdapter(birthDateMonthAdapter);
//
//        binding.imgEdit.setOnClickListener(v -> ImagePicker.with(AdminSignupActivity.this)
//                .crop()
//                .start());
//
//        binding.llContactInfo.setVisibility(View.GONE);
//        binding.ivContactInfoExpandCollapse.setRotation(0);
//        binding.rlContactInfoExpandCollapse.setOnClickListener(v -> {
//            if (binding.llContactInfo.getVisibility() == View.VISIBLE) {
//                binding.llContactInfo.setVisibility(View.GONE);
//                binding.ivContactInfoExpandCollapse.setRotation(0);
//            } else {
//                binding.llContactInfo.setVisibility(View.VISIBLE);
//                binding.ivContactInfoExpandCollapse.setRotation(180);
//            }
//        });
//
//        binding.llBiography.setVisibility(View.GONE);
//        binding.ivBiographyExpandCollapse.setRotation(0);
//        binding.rlBiographyExpandCollapse.setOnClickListener(v -> {
//            if (binding.llBiography.getVisibility() == View.VISIBLE) {
//                binding.llBiography.setVisibility(View.GONE);
//                binding.ivBiographyExpandCollapse.setRotation(0);
//            } else {
//                binding.llBiography.setVisibility(View.VISIBLE);
//                binding.ivBiographyExpandCollapse.setRotation(180);
//            }
//        });
//
//        binding.rlLogin.setOnClickListener(v -> {
//            Intent intent = new Intent(AdminSignupActivity.this, SignInActivity.class);
//            startActivity(intent);
//            finish();
//        });
//
//        binding.rlSignUp.setOnClickListener(v -> {
//            int selectedId = binding.radioGroup.getCheckedRadioButtonId();
//            RadioButton radioButton = findViewById(selectedId);
//            if (binding.radioGroup.getCheckedRadioButtonId() != -1) {
//                gender = radioButton.getText().toString();
//            }
//
//            if (binding.rbFemale.isChecked()) {
//                gender = "Female";
//                Helper.savePreferenceData(AdminSignupActivity.this, "Gender", "Female");
//            } else if (binding.rbMale.isChecked()) {
//                gender = "Male";
//                Helper.savePreferenceData(AdminSignupActivity.this, "Gender", "Male");
//            } else if (binding.rbOthers.isChecked()) {
//                gender = "Others";
//                Helper.savePreferenceData(AdminSignupActivity.this, "Gender", "Others");
//            }
//
//            if (TextUtils.isEmpty(binding.edtName.getText().toString().trim())) {
//                requestFocusAndShowError(binding.edtName, "Enter First Name");
//            } else if (TextUtils.isEmpty(binding.edtLastName.getText().toString().trim())) {
//                requestFocusAndShowError(binding.edtLastName, "Enter Last Name");
//            } else if (gender.equalsIgnoreCase("")) {
//                Toast.makeText(AdminSignupActivity.this, "Please Select Gender", Toast.LENGTH_LONG).show();
//            } else if (!isValidBirthDate()) {
//            } else if (TextUtils.isEmpty(binding.edtEmail.getText().toString().trim())) {
//                requestFocusAndShowError(binding.edtEmail, "Enter Email");
//            } else if (!Utility.isValidEmail(binding.edtEmail.getText().toString())) {
//                requestFocusAndShowError(binding.edtEmail, "Valid Email Address Required");
//            } else if (TextUtils.isEmpty(binding.edtMobile.getText().toString().trim())) {
//                requestFocusAndShowError(binding.edtMobile, "Enter Mobile Number");
//            } else if (TextUtils.isEmpty(binding.edtPassword.getText().toString().trim())) {
//                requestFocusAndShowError(binding.edtPassword, "Enter Password");
//            } else if (binding.edtPassword.getText().toString().length() < 8) {
//                requestFocusAndShowError(binding.edtPassword, "Minimum 8 Characters Required");
//            } else if (TextUtils.isEmpty(binding.edtTreeName.getText().toString().trim())) {
//                requestFocusAndShowError(binding.edtTreeName, "Enter Family Tree Name");
//            } else if (TextUtils.isEmpty(binding.edtLegacyName.getText().toString().trim())) {
//                requestFocusAndShowError(binding.edtLegacyName, "Enter Legacy Name");
//            } else if (TextUtils.isEmpty(binding.edtLegacyMail.getText().toString().trim())) {
//                requestFocusAndShowError(binding.edtLegacyMail, "Enter Legacy Email");
//            } else if (!Utility.isValidEmail(binding.edtLegacyMail.getText().toString())) {
//                requestFocusAndShowError(binding.edtLegacyMail, "Valid Legacy Email Address Required");
//            } else {
//                registerAdmin();
//            }
//        });
//    }
//
//    void requestFocusAndShowError(EditText editText, String errorMessage) {
//        editText.setError(errorMessage);
//        editText.post(() -> {
//            editText.requestFocus();
//            binding.scrollView.smoothScrollTo(0, editText.getTop() - 100);
//            InputMethodManager imm = (InputMethodManager) getSystemService(Context.INPUT_METHOD_SERVICE);
//            if (imm != null) {
//                imm.showSoftInput(editText, InputMethodManager.SHOW_IMPLICIT);
//            }
//        });
//    }
//
//    boolean isValidBirthDate() {
//        if (binding.spnBirthDateDay.getSelectedItemPosition() == 0) {
//            Toast.makeText(AdminSignupActivity.this, "Select Birth Date Day", Toast.LENGTH_LONG).show();
//            return false;
//        } else if (binding.spnBirthDateMonth.getSelectedItemPosition() == 0) {
//            Toast.makeText(AdminSignupActivity.this, "Select Birth Date Month", Toast.LENGTH_LONG).show();
//            return false;
//        } else if (TextUtils.isEmpty(binding.edtYear.getText().toString().trim())) {
//            requestFocusAndShowError(binding.edtYear, "Enter Birth Date Year");
//            return false;
//        } else if (binding.edtYear.getText().toString().trim().length() < 4) {
//            requestFocusAndShowError(binding.edtYear, "4 Digits Required");
//            return false;
//        } else {
//            birthDate = binding.spnBirthDateDay.getSelectedItem() + "-" + (binding.spnBirthDateMonth.getSelectedItemPosition()) + "-" + binding.edtYear.getText().toString();
//            return true;
//        }
//    }
//
//
//    void registerAdmin() {
//        if (Helper.isNetworkAvailable(this)) {
//            Helper.showProgressDialog(this, "Please Wait");
//            String url = ApiConstants.SIGN_UP;
//            final RequestQueue requestQueue = Volley.newRequestQueue(AdminSignupActivity.this);
//            VolleyMultipartRequest volleyMultipartRequest = new VolleyMultipartRequest(Request.Method.POST, url,
//                    response -> {
//                        Helper.dismissProgressDialog();
//                        String resultResponse = new String(response.data);
//                        Log.e("ToDistry: ", "Response: " + resultResponse);
//                        try {
//                            JSONObject jsonObject = new JSONObject(resultResponse);
//                            if (jsonObject.get("success").toString().equals("1")) {
//                                Helper.saveBooleanPreferenceData(AdminSignupActivity.this, "IsSignUp", true);
//                                Helper.savePreferenceData(AdminSignupActivity.this, "AdminFirstName", binding.edtName.getText().toString());
//                                Helper.savePreferenceData(AdminSignupActivity.this, "AdminLastName", binding.edtLastName.getText().toString());
//                                Helper.savePreferenceData(AdminSignupActivity.this, "AdminMemberId", jsonObject.getJSONObject("data").get("memberId").toString());
//                                Helper.savePreferenceData(AdminSignupActivity.this, "AccessToken", jsonObject.getJSONObject("data").get("accesstoken").toString());
//                                Intent intent = new Intent(AdminSignupActivity.this, ShareTreeCodeActivity.class);
//                                startActivity(intent);
//                                finish();
//                            } else {
//                                if (jsonObject.get("message").toString().equals("Email address already in use")) {
//                                    requestFocusAndShowError(binding.edtEmail, jsonObject.get("message").toString());
//                                } else {
//                                    Utility.showToastMessage(AdminSignupActivity.this, jsonObject.get("message").toString());
//                                }
//                            }
//                        } catch (JSONException e) {
//                            e.printStackTrace();
//                            if (e.getMessage() == null) {
//                                Utility.showToastMessage(AdminSignupActivity.this, "Something went wrong!");
//                            } else {
//                                Utility.showToastMessage(AdminSignupActivity.this, e.getMessage());
//                            }
//                        }
//                    },
//                    error -> {
//                        Helper.dismissProgressDialog();
//                        if (error.getMessage() != null) {
//                            Utility.showToastMessage(AdminSignupActivity.this, error.getMessage());
//                        } else {
//                            Utility.showToastMessage(AdminSignupActivity.this, "Something went wrong!");
//                        }
//                    }) {
//
//                @Override
//                protected Response<NetworkResponse> parseNetworkResponse(NetworkResponse response) {
//                    if (response.headers == null) {
//                        response = new NetworkResponse(
//                                response.statusCode,
//                                response.data,
//                                Collections.emptyMap(),
//                                response.notModified,
//                                response.networkTimeMs);
//                    }
//                    return super.parseNetworkResponse(response);
//                }
//
//                @Override
//                protected Map<String, String> getParams() {
//                    Map<String, String> params = new HashMap<>();
//                    params.put("firstName", binding.edtName.getText().toString());
//                    params.put("lastName", binding.edtLastName.getText().toString());
//                    params.put("gender", Utility.getGender(gender));
//                    params.put("birthDate", birthDate);
//                    params.put("password", binding.edtPassword.getText().toString());
//                    params.put("treeName", binding.edtTreeName.getText().toString());
//                    params.put("legacyName", binding.edtLegacyName.getText().toString());
//                    params.put("legacyEmail", binding.edtLegacyMail.getText().toString());
//                    params.put("email", binding.edtEmail.getText().toString());
//                    params.put("website", binding.edtWebsite.getText().toString());
//                    params.put("blog", binding.edtBlog.getText().toString());
//                    params.put("homePhone", binding.edtHomePhoneNumber.getText().toString());
//                    params.put("workPhone", binding.edtWorkPhoneNumber.getText().toString());
//                    params.put("mobile", binding.edtMobile.getText().toString());
//                    params.put("address", binding.edtAddress.getText().toString());
//                    params.put("birthPlace", binding.edtBirthPlace.getText().toString());
//                    params.put("profession", binding.edtProfession.getText().toString());
//                    params.put("company", binding.edtCompany.getText().toString());
//                    params.put("interests", binding.edtInterests.getText().toString());
//                    params.put("activities", binding.edtActivities.getText().toString());
//                    params.put("bioNotes", binding.edtBioNotes.getText().toString());
//                    return params;
//                }
//
//                @Override
//                protected Map<String, DataPart> getByteData() {
//                    Map<String, DataPart> params = new HashMap<>();
//                    if (userImageURI != null) {
//                        try {
//                            File imageFile = new File(userImageURI.getPath());
//                            byte[] fileData = Utility.getFileBytes(imageFile);
//                            long imageName = System.currentTimeMillis();
//                            params.put("image", new DataPart(imageName + ".png", fileData));
//                        } catch (Exception e) {
//                            e.printStackTrace();
//                        }
//                    }
//                    return params;
//                }
//            };
//            requestQueue.add(volleyMultipartRequest);
//        } else {
//            Utility.showToastMessage(AdminSignupActivity.this, "No Internet Connection");
//        }
//    }
//}


package com.todistory.ui.activity;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.Dialog;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.net.Uri;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextUtils;
import android.text.TextWatcher;
import android.util.Log;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.view.inputmethod.InputMethodManager;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.TooltipCompat;

import com.android.volley.NetworkResponse;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.github.dhaval2404.imagepicker.ImagePicker;
import com.google.gson.Gson;
import com.todistory.R;
import com.todistory.api.ApiConstants;
import com.todistory.api.VolleyMultipartRequest;
import com.todistory.common.Helper;
import com.todistory.databinding.ActivityAdminSignupBinding;
import com.todistory.model.MemberInfoModel;
import com.todistory.model.SuffixModel;
import com.todistory.ui.activity.home.HomeActivity;
import com.todistory.ui.helper.Utility;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class AdminSignupActivity extends AppCompatActivity {

    ActivityAdminSignupBinding binding;
    String gender = "", birthDate = "", currentDateTime = "";
    Uri userImageURI;
    boolean isEmailExists = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityAdminSignupBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
        actionView();
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (resultCode == Activity.RESULT_OK) {
            if (data != null) {
                userImageURI = data.getData();
                binding.ivUser.setImageURI(userImageURI);
            }
        } else if (resultCode == ImagePicker.RESULT_ERROR) {
            Toast.makeText(this, ImagePicker.getError(data), Toast.LENGTH_SHORT).show();
        } else {
            Toast.makeText(this, "Task Cancelled", Toast.LENGTH_SHORT).show();
        }
    }

    public void actionView() {
        binding.ivHome.setOnClickListener(v -> {
            Intent intent = new Intent(AdminSignupActivity.this, WelcomeActivity.class);
            startActivity(intent);
            finish();
        });

        binding.ivPasswordInfo.setOnClickListener(v -> new AlertDialog.Builder(AdminSignupActivity.this)
                .setTitle(getString(R.string.password_must_match_criteria))
                .setMessage(getString(R.string.minimum_8_characters)+getString(R.string.at_least_one_number)+getString(R.string.at_least_one_special_character)+getString(R.string.at_least_one_uppercase_letter))
                .setPositiveButton(getString(R.string.ok), null)
                .show());

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

        binding.edtEmail.getEditText().addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {
            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
            }

            @Override
            public void afterTextChanged(Editable editable) {
                String email = editable.toString();
                if (!Utility.isValidEmail(email)) {
                    binding.edtEmail.setError(getString(R.string.valid_email_address_required));
                } else {
                    binding.edtEmail.setError(null);
                    checkEmail(email);
                }
            }
        });

        ArrayAdapter<CharSequence> birthDateDayAdapter = ArrayAdapter.createFromResource(
                this, R.array.birth_date_day, android.R.layout.simple_spinner_item);
        birthDateDayAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        binding.spnBirthDateDay.setAdapter(birthDateDayAdapter);


        ArrayAdapter<CharSequence> birthDateMonthAdapter = ArrayAdapter.createFromResource(
                this, R.array.birth_date_month, android.R.layout.simple_spinner_item);
        birthDateMonthAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        binding.spnBirthDateMonth.setAdapter(birthDateMonthAdapter);

        binding.imgEdit.setOnClickListener(v -> ImagePicker.with(AdminSignupActivity.this)
                .crop()
                .start());

        binding.llContactInfo.setVisibility(View.GONE);
        binding.ivContactInfoExpandCollapse.setRotation(0);
        binding.rlContactInfoExpandCollapse.setOnClickListener(v -> {
            if (binding.llContactInfo.getVisibility() == View.VISIBLE) {
                binding.llContactInfo.setVisibility(View.GONE);
                binding.ivContactInfoExpandCollapse.setRotation(0);
            } else {
                binding.llContactInfo.setVisibility(View.VISIBLE);
                binding.ivContactInfoExpandCollapse.setRotation(180);
            }
        });

        binding.llBiography.setVisibility(View.GONE);
        binding.ivBiographyExpandCollapse.setRotation(0);
        binding.rlBiographyExpandCollapse.setOnClickListener(v -> {
            if (binding.llBiography.getVisibility() == View.VISIBLE) {
                binding.llBiography.setVisibility(View.GONE);
                binding.ivBiographyExpandCollapse.setRotation(0);
            } else {
                binding.llBiography.setVisibility(View.VISIBLE);
                binding.ivBiographyExpandCollapse.setRotation(180);
            }
        });

        binding.rlLogin.setOnClickListener(v -> {
            Intent intent = new Intent(AdminSignupActivity.this, SignInActivity.class);
            startActivity(intent);
            finish();
        });

        binding.rlSignUp.setOnClickListener(v -> {
            int selectedId = binding.radioGroup.getCheckedRadioButtonId();
            RadioButton radioButton = findViewById(selectedId);
            if (binding.radioGroup.getCheckedRadioButtonId() != -1) {
                gender = radioButton.getText().toString();
            }

            if (binding.rbFemale.isChecked()) {
                gender = "Female";
                Helper.savePreferenceData(AdminSignupActivity.this, "Gender", "Female");
            } else if (binding.rbMale.isChecked()) {
                gender = "Male";
                Helper.savePreferenceData(AdminSignupActivity.this, "Gender", "Male");
            } else if (binding.rbOthers.isChecked()) {
                gender = "Rather not say";
                Helper.savePreferenceData(AdminSignupActivity.this, "Gender", "Rather not say");
            }
//
//            if (TextUtils.isEmpty(binding.edtName.getText().toString().trim())) {
//                requestFocusAndShowError(binding.edtName, "Enter First Name");
//            } else if (TextUtils.isEmpty(binding.edtLastName.getText().toString().trim())) {
//                requestFocusAndShowError(binding.edtLastName, "Enter Last Name");
//            } else if (gender.equalsIgnoreCase("")) {
//                Toast.makeText(AdminSignupActivity.this, "Please Select Gender", Toast.LENGTH_LONG).show();
//            } else if (!isValidBirthDate()) {
//            } else if (TextUtils.isEmpty(binding.edtEmail.getText().toString().trim())) {
//                requestFocusAndShowError(binding.edtEmail, "Enter Email");
//            } else if (!Utility.isValidEmail(binding.edtEmail.getText().toString())) {
//                requestFocusAndShowError(binding.edtEmail, "Valid Email Address Required");
//            } else if (TextUtils.isEmpty(binding.edtMobile.getText().toString().trim())) {
//                requestFocusAndShowError(binding.edtMobile, "Enter Mobile Number");
//            } else if (TextUtils.isEmpty(binding.edtPassword.getText().toString().trim())) {
//                requestFocusAndShowError(binding.edtPassword, "Enter Password");
//            } else if (binding.edtPassword.getText().toString().length() < 8) {
//                requestFocusAndShowError(binding.edtPassword, "Minimum 8 Characters Required");
//            } else if (TextUtils.isEmpty(binding.edtTreeName.getText().toString().trim())) {
//                requestFocusAndShowError(binding.edtTreeName, "Enter Family Tree Name");
//            } else if (TextUtils.isEmpty(binding.edtLegacyName.getText().toString().trim())) {
//                requestFocusAndShowError(binding.edtLegacyName, "Enter Legacy Name");
//            } else if (TextUtils.isEmpty(binding.edtLegacyMail.getText().toString().trim())) {
//                requestFocusAndShowError(binding.edtLegacyMail, "Enter Legacy Email");
//            } else if (!Utility.isValidEmail(binding.edtLegacyMail.getText().toString())) {
//                requestFocusAndShowError(binding.edtLegacyMail, "Valid Legacy Email Address Required");
//            } else {
//                registerAdmin();
//            }

            boolean hasError = false;
            if (TextUtils.isEmpty(binding.edtName.getEditText().getText().toString())) {
                binding.edtName.setError(getString(R.string.enter_first_name));
                hasError = true;
            } else {
                binding.edtName.setError(null);
            }

            if (TextUtils.isEmpty(binding.edtLastName.getEditText().getText().toString())) {
                binding.edtLastName.setError(getString(R.string.enter_last_name));
                hasError = true;
            } else {
                binding.edtLastName.setError(null);
            }

            if (gender.equalsIgnoreCase("")) {
                binding.txtGenderErrorMessage.setVisibility(View.VISIBLE);
                hasError = true;
            } else {
                binding.txtGenderErrorMessage.setVisibility(View.GONE);
            }

            if (!isValidBirthDate()) {
                hasError = true;
            } else {
                binding.edtYear.setError(null);
                binding.txtBirthDateErrorMessage.setVisibility(View.GONE);
                birthDate = binding.spnBirthDateDay.getSelectedItem() + "-" + (binding.spnBirthDateMonth.getSelectedItemPosition()) + "-" + binding.edtYear.getEditText().getText().toString();
            }

            if (TextUtils.isEmpty(binding.edtEmail.getEditText().getText().toString())) {
                binding.edtEmail.setError(getString(R.string.enter_email));
                hasError = true;
            } else if (!Utility.isValidEmail(binding.edtEmail.getEditText().getText().toString())) {
                binding.edtEmail.setError(getString(R.string.valid_email_address_required));
                hasError = true;
            } else if (isEmailExists) {
                binding.edtEmail.setError(getString(R.string.this_email_already_exists));
                hasError = true;
            }else {
                binding.edtEmail.setError(null);
            }

            if (TextUtils.isEmpty(binding.edtMobile.getEditText().getText().toString())) {
                binding.edtMobile.setError(getString(R.string.enter_mobile_number));
                hasError = true;
            } else {
                binding.edtMobile.setError(null);
            }

            if (TextUtils.isEmpty(binding.edtPassword.getEditText().getText().toString())) {
                binding.edtPassword.setError(getString(R.string.enter_password));
                hasError = true;
            } else if (binding.edtPassword.getEditText().getText().length() < 8) {
                binding.edtPassword.setError(getString(R.string.minimum_8_characters_required));
                hasError = true;
            } else {
                binding.edtPassword.setError(null);
            }

            if (TextUtils.isEmpty(binding.edtTreeName.getEditText().getText().toString())) {
                binding.edtTreeName.setError(getString(R.string.enter_family_tree_name));
                hasError = true;
            } else {
                binding.edtTreeName.setError(null);
            }

//            if (TextUtils.isEmpty(binding.edtLegacyName.getEditText().getText().toString())) {
//                binding.edtLegacyName.setError("Enter Legacy Name");
//                hasError = true;
//            } else {
//                binding.edtLegacyName.setError(null);
//            }
//
//            if (TextUtils.isEmpty(binding.edtLegacyMail.getEditText().getText().toString())) {
//                binding.edtLegacyMail.setError("Enter Legacy Email");
//                hasError = true;
//            } else if (!Utility.isValidEmail(binding.edtLegacyMail.getEditText().getText().toString())) {
//                binding.edtLegacyMail.setError("Valid Legacy Email Address Required");
//                hasError = true;
//            } else {
//                binding.edtLegacyMail.setError(null);
//            }

            if (!hasError) {
                showTermsDialog(v);
                //registerAdmin();
            }
        });
    }

    void requestFocusAndShowError(EditText editText, String errorMessage) {
        editText.setError(errorMessage);
        editText.post(() -> {
            editText.requestFocus();
            binding.scrollView.smoothScrollTo(0, editText.getTop() - 100);
            InputMethodManager imm = (InputMethodManager) getSystemService(Context.INPUT_METHOD_SERVICE);
            if (imm != null) {
                imm.showSoftInput(editText, InputMethodManager.SHOW_IMPLICIT);
            }
        });
    }

    boolean isValidBirthDate() {
        if (binding.spnBirthDateDay.getSelectedItemPosition() == 0 && binding.spnBirthDateMonth.getSelectedItemPosition() == 0) {
            binding.txtBirthDateErrorMessage.setText(getString(R.string.select_birth_date));
            binding.txtBirthDateErrorMessage.setVisibility(View.VISIBLE);
            return false;
        } else {
            binding.txtBirthDateErrorMessage.setVisibility(View.GONE);
        }

        if (binding.spnBirthDateDay.getSelectedItemPosition() == 0) {
            binding.txtBirthDateErrorMessage.setText(getString(R.string.select_birth_date_day));
            binding.txtBirthDateErrorMessage.setVisibility(View.VISIBLE);
            return false;
        }

        if (binding.spnBirthDateMonth.getSelectedItemPosition() == 0) {
            binding.txtBirthDateErrorMessage.setText(getString(R.string.select_birth_date_month));
            binding.txtBirthDateErrorMessage.setVisibility(View.VISIBLE);
            return false;
        }

        if (TextUtils.isEmpty(binding.edtYear.getEditText().getText().toString().trim())) {
            binding.edtYear.setError(getString(R.string.enter_birth_date_year));
            return false;
        }

        if (binding.edtYear.getEditText().getText().toString().trim().length() < 4) {
            binding.edtYear.setError(getString(R.string.four_digits_required));
            return false;
        }
        return true;
    }


    void registerAdmin() {
        if (Helper.isNetworkAvailable(this)) {
            Helper.showProgressDialog(this, getString(R.string.please_wait));
            String url = ApiConstants.SIGN_UP;
            final RequestQueue requestQueue = Volley.newRequestQueue(AdminSignupActivity.this);
            VolleyMultipartRequest volleyMultipartRequest = new VolleyMultipartRequest(Request.Method.POST, url,
                    response -> {
                        Helper.dismissProgressDialog();
                        String resultResponse = new String(response.data);
                        Log.e("ToDistry: ", "Response: " + resultResponse);
                        try {
                            JSONObject jsonObject = new JSONObject(resultResponse);
                            if (jsonObject.get("success").toString().equals("1")) {
                                Helper.saveBooleanPreferenceData(AdminSignupActivity.this, "IsSignUp", true);
                                Helper.savePreferenceData(AdminSignupActivity.this, "AdminFirstName", binding.edtName.getEditText().getText().toString());
                                Helper.savePreferenceData(AdminSignupActivity.this, "AdminLastName", binding.edtLastName.getEditText().getText().toString());
                                Helper.savePreferenceData(AdminSignupActivity.this, "AdminMemberId", jsonObject.getJSONObject("data").get("id").toString());
                                Helper.savePreferenceData(AdminSignupActivity.this, "AccessToken", jsonObject.getJSONObject("data").get("accesstoken").toString());
                                Helper.savePreferenceData(this, "UserImage", jsonObject.getJSONObject("data").get("image").toString());
                                Helper.savePreferenceData(this, "UserEmail", jsonObject.getJSONObject("data").get("email").toString());

                                //Intent intent = new Intent(AdminSignupActivity.this, ShareTreeCodeActivity.class);
                                Intent intent = new Intent(AdminSignupActivity.this, HomeActivity.class);
                                startActivity(intent);
                                finish();
                            } else {
                                if (jsonObject.get("message").toString().equals("Email address already in use")) {
                                    binding.edtEmail.setError(jsonObject.get("message").toString());
                                } else {
                                    Utility.showToastMessage(AdminSignupActivity.this, jsonObject.get("message").toString());
                                }
                            }
                        } catch (JSONException e) {
                            e.printStackTrace();
                            if (e.getMessage() == null) {
                                Utility.showToastMessage(AdminSignupActivity.this, "Something went wrong!");
                            } else {
                                Utility.showToastMessage(AdminSignupActivity.this, e.getMessage());
                            }
                        }
                    },
                    error -> {
                        Helper.dismissProgressDialog();
                        if (error.getMessage() != null) {
                            Utility.showToastMessage(AdminSignupActivity.this, error.getMessage());
                        } else {
                            Utility.showToastMessage(AdminSignupActivity.this, "Something went wrong!");
                        }
                    }) {

                @Override
                protected Response<NetworkResponse> parseNetworkResponse(NetworkResponse response) {
                    if (response.headers == null) {
                        response = new NetworkResponse(
                                response.statusCode,
                                response.data,
                                Collections.emptyMap(),
                                response.notModified,
                                response.networkTimeMs);
                    }
                    return super.parseNetworkResponse(response);
                }

                @Override
                protected Map<String, String> getParams() {
                    Map<String, String> params = new HashMap<>();
                    params.put("firstName", binding.edtName.getEditText().getText().toString());
                    params.put("middleName", binding.edtMiddleName.getEditText().getText().toString());
                    params.put("lastName", binding.edtLastName.getEditText().getText().toString());
                    params.put("gender", Utility.getGender(gender));
                    params.put("birthDate", birthDate);
                    params.put("password", binding.edtPassword.getEditText().getText().toString());
                    params.put("treeName", binding.edtTreeName.getEditText().getText().toString());
                    params.put("legacyName", binding.edtLegacyName.getEditText().getText().toString());
                    params.put("legacyEmail", binding.edtLegacyMail.getEditText().getText().toString());
                    params.put("email", binding.edtEmail.getEditText().getText().toString());
                    params.put("website", binding.edtWebsite.getText().toString());
                    params.put("blog", binding.edtBlog.getText().toString());
                    params.put("homePhone", binding.edtHomePhoneNumber.getText().toString());
                    params.put("workPhone", binding.edtWorkPhoneNumber.getText().toString());
                    params.put("mobile", binding.edtMobile.getEditText().getText().toString());
                    params.put("address", binding.edtAddress.getText().toString());
                    params.put("birthPlace", binding.edtBirthPlace.getText().toString());
                    params.put("profession", binding.edtProfession.getText().toString());
                    params.put("company", binding.edtCompany.getText().toString());
                    params.put("interests", binding.edtInterests.getText().toString());
                    params.put("activities", binding.edtActivities.getText().toString());
                    params.put("bioNotes", binding.edtBioNotes.getText().toString());
                    params.put("acceptance_at", currentDateTime);
                    return params;
                }

                @Override
                protected Map<String, DataPart> getByteData() {
                    Map<String, DataPart> params = new HashMap<>();
                    if (userImageURI != null) {
                        try {
                            File imageFile = new File(userImageURI.getPath());
                            byte[] fileData = Utility.getFileBytes(imageFile);
                            long imageName = System.currentTimeMillis();
                            params.put("image", new DataPart(imageName + ".png", fileData));
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                    return params;
                }
            };
            requestQueue.add(volleyMultipartRequest);
        } else {
            Utility.showToastMessage(AdminSignupActivity.this, "No Internet Connection");
        }
    }

    public void showTermsDialog(View view) {
        Dialog dialog = new Dialog(this);
        dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
        dialog.setCancelable(true);
        dialog.setContentView(R.layout.terms_dialog);
        if (dialog.getWindow() != null) {
            dialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
            dialog.getWindow().setLayout(WindowManager.LayoutParams.MATCH_PARENT, WindowManager.LayoutParams.WRAP_CONTENT);
        }
        CheckBox cbTerms = dialog.findViewById(R.id.cbTerms);
        RelativeLayout rlAccept = dialog.findViewById(R.id.rlAccept);
        if (cbTerms == null || rlAccept == null) {
            dialog.dismiss();
            return;
        }
        rlAccept.setEnabled(false);
        rlAccept.setAlpha(0.5f);
        cbTerms.setOnCheckedChangeListener((buttonView, isChecked) -> {
            if (buttonView.isPressed()) {
                rlAccept.setEnabled(isChecked);
                rlAccept.setAlpha(isChecked ? 1.0f : 0.5f);
            }
        });
        rlAccept.setOnClickListener(v -> {
            if (cbTerms.isChecked()) {
                dialog.dismiss();
                currentDateTime = Helper.getCurrentDateTime();
                registerAdmin();
            }
        });
        dialog.show();
    }


    void checkEmail(String email) {
        if (Helper.isNetworkAvailable(this)) {
            RequestQueue requestQueue = Volley.newRequestQueue(this);
            JSONObject jsonParams = new JSONObject();
            try {
                jsonParams.put("email", email);
            } catch (JSONException e) {
                e.printStackTrace();
            }
            JsonObjectRequest jsonRequest = new JsonObjectRequest(Request.Method.POST, ApiConstants.CHECK_EMAIL, jsonParams,
                    response -> {
                        try {
                            JSONObject jsonObject = new JSONObject(response.toString());
                            isEmailExists = jsonObject.getBoolean("isExist");
                            if (isEmailExists) {
                                binding.edtEmail.setError("This Email Already Exists");
                            }else{
                                binding.edtEmail.setError(null);
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