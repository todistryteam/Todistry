package com.todistory.ui.activity.createfamily;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.DatePickerDialog;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.view.WindowManager;
import android.view.inputmethod.InputMethodManager;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.NetworkResponse;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.github.dhaval2404.imagepicker.ImagePicker;
import com.google.gson.Gson;
import com.squareup.picasso.Picasso;
import com.todistory.R;
import com.todistory.api.ApiConstants;
import com.todistory.api.VolleyMultipartRequest;
import com.todistory.common.Helper;
import com.todistory.databinding.ActivityEditMemberBinding;
import com.todistory.model.MemberInfoModel;
import com.todistory.model.RelationWithAdminModel;
import com.todistory.model.SuffixModel;
import com.todistory.ui.activity.BaseActivity;
import com.todistory.ui.helper.Utility;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class EditMemberActivity extends BaseActivity {

    ActivityEditMemberBinding binding;
    String memberId = "", gender = "", birthDate = "", personStatus = "";
    Uri userImageURI;
    private List<SuffixModel> suffixList;
    private List<RelationWithAdminModel> relationWithAdminList;

    @SuppressLint("NonConstantResourceId")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        binding = ActivityEditMemberBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            getWindow().getAttributes().layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;
            getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
        }
        Bundle bundle = getIntent().getExtras();
        memberId = bundle.getString("memberId");
        binding.ivBack.setOnClickListener(v -> onBackPressed());
        binding.ivCalender.setOnClickListener(v -> getBirthDate());
        initSuffix();
        initRelationshipWithAdmin();
        ArrayAdapter<SuffixModel> suffixAdapter = new ArrayAdapter<>(this, android.R.layout.simple_spinner_item, suffixList);
        suffixAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        binding.spnSuffix.setAdapter(suffixAdapter);
        binding.spnSuffix.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                if (position == 0) {
                    ((TextView) parent.getChildAt(0)).setTextColor(Color.GRAY);
                }
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });


        ArrayAdapter<RelationWithAdminModel> relationshipWithAdminAdapter = new ArrayAdapter<>(this, android.R.layout.simple_spinner_item, relationWithAdminList);
        relationshipWithAdminAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        binding.spnRelationshipWithAdmin.setAdapter(relationshipWithAdminAdapter);
        binding.spnRelationshipWithAdmin.setEnabled(false);
        binding.spnRelationshipWithAdmin.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                if (position == 0) {
                    ((TextView) parent.getChildAt(0)).setTextColor(Color.GRAY);
                }
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {
                // Do nothing
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

        binding.spnBirthNameSuffix.setAdapter(suffixAdapter);
        binding.spnBirthNameSuffix.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                if (position == 0) {
                    ((TextView) parent.getChildAt(0)).setTextColor(Color.GRAY);
                }
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {
                // Do nothing
            }
        });

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

        binding.ivAdd.setOnClickListener(v -> ImagePicker.with(EditMemberActivity.this)
                .crop()
                .start());

        binding.radioGroup.setOnCheckedChangeListener((group, checkedId) -> {
            switch (checkedId) {
                case R.id.rbFemale:
                    gender = "F";
                    break;
                case R.id.rbMale:
                    gender = "M";
                    break;
                case R.id.rbOthers:
                    gender = "O";
                    break;
            }
        });

        binding.rgPersonStatus.setOnCheckedChangeListener((group, checkedId) -> {
            switch (checkedId) {
                case R.id.rbAlive:
                    personStatus = "A";
                    break;
                case R.id.rbDeceased:
                    personStatus = "D";
                    break;
            }
        });


        binding.rlSubmit.setOnClickListener(v -> {
//            if (binding.edtName.getEditText().getText().toString().equals("")) {
//               // Toast.makeText(EditMemberActivity.this, "Enter First Name", Toast.LENGTH_LONG).show();
//                requestFocusAndShowError(binding.edtName, "Enter First Name");
//            } else if (binding.edtName.getEditText().getText().toString().equals("")) {
//               // Toast.makeText(EditMemberActivity.this, "Enter Last Name", Toast.LENGTH_LONG).show();
//                requestFocusAndShowError(binding.edtLastName, "Enter Last Name");
//            } else if (gender.equalsIgnoreCase("")) {
//                Toast.makeText(EditMemberActivity.this, "Please Select Gender", Toast.LENGTH_LONG).show();
//            } else if (!isValidBirthDate()) {
//                //Toast.makeText(EditMemberActivity.this, "Select Birth Date", Toast.LENGTH_LONG).show();
//            } else if (personStatus.equalsIgnoreCase("")) {
//                Toast.makeText(EditMemberActivity.this, "Please Select Person Status", Toast.LENGTH_LONG).show();
//            } else {
//                updateMember();
//            }

            boolean hasError = false;
            if (binding.edtName.getEditText().getText().toString().equals("")) {
                binding.edtName.setError(getString(R.string.enter_first_name));
                hasError = true;
            } else {
                binding.edtName.setError(null);
            }

            if (binding.edtLastName.getEditText().getText().toString().equals("")) {
                binding.edtLastName.setError(getString(R.string.enter_last_name));
                hasError = true;
            } else {
                binding.edtLastName.setError(null);
            }

            if (binding.spnSuffix.getSelectedItemPosition() == 0) {
                binding.txtSuffixErrorMessage.setVisibility(View.VISIBLE);
                hasError = true;
            } else {
                binding.txtSuffixErrorMessage.setVisibility(View.GONE);
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

            if (personStatus.equalsIgnoreCase("")) {
                binding.txtPersonStatusErrorMessage.setVisibility(View.VISIBLE);
                hasError = true;
            } else {
                binding.txtPersonStatusErrorMessage.setVisibility(View.GONE);
            }

            if (!hasError) {
                updateMember();
            }
        });

        getMemberDetails();
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

    void getBirthDate() {
        final Calendar c = Calendar.getInstance();
        int year = c.get(Calendar.YEAR);
        int month = c.get(Calendar.MONTH);
        int day = c.get(Calendar.DAY_OF_MONTH);
        @SuppressLint("SetTextI18n") DatePickerDialog datePickerDialog = new DatePickerDialog(
                this,
                R.style.CalenderDialogTheme,
                (view, year1, monthOfYear, dayOfMonth) -> {
                    binding.edtBirthDate.setText(dayOfMonth + "-" + (monthOfYear + 1) + "-" + year1);
                },
                year, month, day);
        datePickerDialog.show();
    }

    @SuppressLint("SetTextI18n")
    private void setBirthDate(String birthDate) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("d-M-yyyy");
        try {
            Date date = dateFormat.parse(birthDate);
            Calendar calendar = Calendar.getInstance();
            if (date != null) {
                calendar.setTime(date);
            }
            int day = calendar.get(Calendar.DAY_OF_MONTH);
            int month = calendar.get(Calendar.MONTH) + 1; // Adding 1 because months are 0-based
            int year = calendar.get(Calendar.YEAR);
            binding.spnBirthDateDay.setSelection(day);
            binding.spnBirthDateMonth.setSelection(month);
            binding.edtYear.getEditText().setText(""+year);
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

    private void getMemberDetails() {
        Helper.showProgressDialog(EditMemberActivity.this, getString(R.string.please_wait));
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
                                    .into(binding.ivUser);
                        }

                        if (memberInfoModel.getData().getFirstName() != null) {
                            binding.edtName.getEditText().setText(memberInfoModel.getData().getFirstName());
                        }
                        if (memberInfoModel.getData().getMiddleName() != null) {
                            binding.edtMidlleName.getEditText().setText(memberInfoModel.getData().getMiddleName());
                        }
                        if (memberInfoModel.getData().getLastName() != null) {
                            binding.edtLastName.getEditText().setText(memberInfoModel.getData().getLastName());
                        }
                        if (memberInfoModel.getData().getGender() != null) {
                            switch (memberInfoModel.getData().getGender()) {
                                case "M":
                                    binding.rbMale.setChecked(true);
                                    break;
                                case "F":
                                    binding.rbFemale.setChecked(true);
                                    break;
                                case "O":
                                    binding.rbOthers.setChecked(true);
                                    break;
                            }
                        }
                        if (memberInfoModel.getData().getBirthDate() != null) {
                            binding.edtBirthDate.setText(memberInfoModel.getData().getBirthDate());
                            setBirthDate(memberInfoModel.getData().getBirthDate());
                        }

                        if (memberInfoModel.getData().getEmail() != null) {
                            binding.edtEmail.setText(memberInfoModel.getData().getEmail());
                        }
                        if (memberInfoModel.getData().getWebsite() != null) {
                            binding.edtWebsite.setText(memberInfoModel.getData().getWebsite());
                        }
                        if (memberInfoModel.getData().getBlog() != null) {
                            binding.edtBlog.setText(memberInfoModel.getData().getBlog());
                        }
                        if (memberInfoModel.getData().getHomePhone() != null) {
                            binding.edtHomePhoneNumber.setText(memberInfoModel.getData().getHomePhone());
                        }
                        if (memberInfoModel.getData().getWorkPhone() != null) {
                            binding.edtWorkPhoneNumber.setText(memberInfoModel.getData().getWorkPhone());
                        }
                        if (memberInfoModel.getData().getMobile() != null) {
                            binding.edtMobile.setText(memberInfoModel.getData().getMobile());
                        }

                        if (memberInfoModel.getData().getProfession() != null) {
                            binding.edtProfession.setText(memberInfoModel.getData().getProfession());
                        }
                        if (memberInfoModel.getData().getCompany() != null) {
                            binding.edtCompany.setText(memberInfoModel.getData().getCompany());
                        }
                        if (memberInfoModel.getData().getInterests() != null) {
                            binding.edtInterests.setText(memberInfoModel.getData().getInterests());
                        }
                        if (memberInfoModel.getData().getActivities() != null) {
                            binding.edtActivities.setText(memberInfoModel.getData().getActivities());
                        }
                        if (memberInfoModel.getData().getBioNotes() != null) {
                            binding.edtBioNotes.setText(memberInfoModel.getData().getBioNotes());
                        }

                        if(memberInfoModel.getData().getNameSuffix() != null){
                            for (int i=0; i<suffixList.size();i++){
                                if(suffixList.get(i).getValue().equals(memberInfoModel.getData().getNameSuffix())){
                                    binding.spnSuffix.setSelection(i);
                                    break;
                                }
                            }
                        }

                        if(memberInfoModel.getData().getRelationShipToAdmin() != null){
                            for (int i=0; i<relationWithAdminList.size();i++){
                                if(relationWithAdminList.get(i).getValue().equals(memberInfoModel.getData().getRelationShipToAdmin())){
                                    binding.spnRelationshipWithAdmin.setSelection(i);
                                    break;
                                }
                            }
                        }

                        if (memberInfoModel.getData().getBirthDay() != null) {
                            if (memberInfoModel.getData().getBirthDay().equals("A")) {
                                binding.rbAlive.setChecked(true);
                            } else if (memberInfoModel.getData().getBirthDay().equals("D")) {
                                binding.rbDeceased.setChecked(true);
                            }
                        }
                        if (memberInfoModel.getData().getSteetNumber() != null) {
                            binding.edtStreetNumber.setText(memberInfoModel.getData().getSteetNumber());
                        }
                        if (memberInfoModel.getData().getAptNumber() != null) {
                            binding.edtAptOrUnitNumber.setText(memberInfoModel.getData().getAptNumber());
                        }
                        if (memberInfoModel.getData().getCity() != null) {
                            binding.edtCity.setText(memberInfoModel.getData().getCity());
                        }
                        if (memberInfoModel.getData().getState() != null) {
                            binding.edtState.setText(memberInfoModel.getData().getState());
                        }
                        if (memberInfoModel.getData().getZipCode() != null) {
                            binding.edtZipCode.setText(memberInfoModel.getData().getZipCode());
                        }
                        if(memberInfoModel.getData().getNickNameSuffix() != null){
                            for (int i=0; i<suffixList.size();i++){
                                if(suffixList.get(i).getValue().equals(memberInfoModel.getData().getNickNameSuffix())){
                                    binding.spnBirthNameSuffix.setSelection(i);
                                    break;
                                }
                            }
                        }
                        if (memberInfoModel.getData().getBirthFirstName() != null) {
                            binding.edtBirthFirstName.setText(memberInfoModel.getData().getBirthFirstName());
                        }
                        if (memberInfoModel.getData().getBirthLastName() != null) {
                            binding.edtBirthLastName.setText(memberInfoModel.getData().getBirthLastName());
                        }
                        if (memberInfoModel.getData().getNickName() != null) {
                            binding.edtNickName.setText(memberInfoModel.getData().getNickName());
                        }
                        Helper.dismissProgressDialog();
                    } catch (JSONException e) {
                        e.printStackTrace();
                        Helper.dismissProgressDialog();
                        Utility.showToastMessage(EditMemberActivity.this, e.getMessage());
                    }
                }, error -> {
            Helper.dismissProgressDialog();
            Utility.showToastMessage(EditMemberActivity.this, error.getMessage());
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
                params.put("accesstoken", Helper.getPreferenceData(EditMemberActivity.this, "AccessToken"));
                return params;
            }
        };
        requestQueue.add(stringRequest);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (resultCode == Activity.RESULT_OK) {
            userImageURI = data.getData();
            binding.ivUser.setImageURI(userImageURI);
        } else if (resultCode == ImagePicker.RESULT_ERROR) {
            Toast.makeText(this, ImagePicker.getError(data), Toast.LENGTH_SHORT).show();
        } else {
            Toast.makeText(this, "Task Cancelled", Toast.LENGTH_SHORT).show();
        }
    }

    void updateMember() {
        if (Helper.isNetworkAvailable(this)) {
            Helper.showProgressDialog(this, getString(R.string.please_wait));
            String url = ApiConstants.UPDATE_MEMBER;
            final RequestQueue requestQueue = Volley.newRequestQueue(EditMemberActivity.this);
            VolleyMultipartRequest volleyMultipartRequest = new VolleyMultipartRequest(Request.Method.POST, url,
                    response -> {
                        Helper.dismissProgressDialog();
                        String resultResponse = new String(response.data);
                        Log.e("ToDistry: ", "Response: " + resultResponse);
                        try {
                            JSONObject jsonObject = new JSONObject(resultResponse);
                            if (jsonObject.get("success").toString().equals("1")) {
                                Intent resultIntent = new Intent();
                                resultIntent.putExtra("isTreeRefresh", true);
                                setResult(RESULT_OK, resultIntent);
                                finish();
                            } else {
                                Utility.showToastMessage(EditMemberActivity.this, jsonObject.get("message").toString());
                            }
                        } catch (JSONException e) {
                            e.printStackTrace();
                            if (e.getMessage() == null) {
                                Utility.showToastMessage(EditMemberActivity.this, "Something went wrong!");
                            } else {
                                Utility.showToastMessage(EditMemberActivity.this, e.getMessage());
                            }
                        }
                    },
                    error -> {
                        Helper.dismissProgressDialog();
                        if (error.getMessage() == null) {
                            Utility.showToastMessage(EditMemberActivity.this, "Something went wrong!");
                        } else {
                            Utility.showToastMessage(EditMemberActivity.this, error.getMessage());
                        }
                    }) {

                @Override
                protected Response<NetworkResponse> parseNetworkResponse(NetworkResponse response) {
                    if (response.headers == null) {
                        response = new NetworkResponse(
                                response.statusCode,
                                response.data,
                                Collections.<String, String>emptyMap(), // this is the important line, set an empty but non-null map.
                                response.notModified,
                                response.networkTimeMs);
                    }
                    return super.parseNetworkResponse(response);
                }

                @Override
                protected Map<String, String> getParams() {
                    Map<String, String> params = new HashMap<>();
                    params.put("firstName", binding.edtName.getEditText().getText().toString());
                    params.put("middleName", binding.edtMidlleName.getEditText().getText().toString());
                    params.put("lastName", binding.edtLastName.getEditText().getText().toString());
                    params.put("gender", gender);
                    params.put("birthDate", birthDate);
                    params.put("nameSuffix", suffixList.get(binding.spnSuffix.getSelectedItemPosition()).getValue());
                    params.put("email", binding.edtEmail.getText().toString());
                    params.put("website", binding.edtWebsite.getText().toString());
                    params.put("blog", binding.edtBlog.getText().toString());
                    params.put("homePhone", binding.edtHomePhoneNumber.getText().toString());
                    params.put("workPhone", binding.edtWorkPhoneNumber.getText().toString());
                    params.put("mobile", binding.edtMobile.getText().toString());
                    params.put("profession", binding.edtProfession.getText().toString());
                    params.put("company", binding.edtCompany.getText().toString());
                    params.put("interests", binding.edtInterests.getText().toString());
                    params.put("activities", binding.edtActivities.getText().toString());
                    params.put("bioNotes", binding.edtBioNotes.getText().toString());
                    params.put("id", memberId);
                    params.put("birthDay", personStatus);
                    params.put("steetNumber", binding.edtStreetNumber.getText().toString());
                    params.put("aptNumber", binding.edtAptOrUnitNumber.getText().toString());
                    params.put("city", binding.edtCity.getText().toString());
                    params.put("state", binding.edtState.getText().toString());
                    params.put("zipCode", binding.edtZipCode.getText().toString());
                    params.put("birthFirstName", binding.edtBirthFirstName.getText().toString());
                    params.put("birthLastName", binding.edtBirthLastName.getText().toString());
                    params.put("nickNameSuffix", suffixList.get(binding.spnBirthNameSuffix.getSelectedItemPosition()).getValue());
                    params.put("nickName", binding.edtNickName.getText().toString());
                    Log.e("ToDistry: ", "Params: "+params);
                    return params;
                }

                @Override
                public Map<String, String> getHeaders() {
                    Map<String, String> params = new HashMap<>();
                    params.put("accesstoken", Helper.getPreferenceData(EditMemberActivity.this, "AccessToken"));
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
            Utility.showToastMessage(EditMemberActivity.this, "No Internet Connection");
        }
    }

    boolean isValidBirthDate() {
//        if (binding.spnBirthDateDay.getSelectedItemPosition() == 0) {
//            Toast.makeText(EditMemberActivity.this, "Select Birth Date Day", Toast.LENGTH_LONG).show();
//            return false;
//        } else if (binding.spnBirthDateMonth.getSelectedItemPosition() == 0) {
//            Toast.makeText(EditMemberActivity.this, "Select Birth Date Month", Toast.LENGTH_LONG).show();
//            return false;
//        } else if (binding.edtYear.getEditText().getText().toString().equals("")) {
//            //Toast.makeText(EditMemberActivity.this, "Enter Birth Date Year", Toast.LENGTH_LONG).show();
//            requestFocusAndShowError(binding.edtYear.getEditText(), "Enter Birth Date Year");
//            return false;
//        } else if (binding.edtYear.getEditText().getText().toString().trim().length() < 4) {
//            requestFocusAndShowError(binding.edtYear.getEditText(), "4 Digits Required");
//            return false;
//        } else {
//            birthDate = binding.spnBirthDateDay.getSelectedItem() + "-" + (binding.spnBirthDateMonth.getSelectedItemPosition()) + "-" + binding.edtYear.getEditText().getText().toString();
//            return true;
//        }

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


    void initRelationshipWithAdmin() {
        relationWithAdminList = new ArrayList<>();
        relationWithAdminList.add(new RelationWithAdminModel("", getString(R.string.select_relationship_with_admin)));

        // Direct family
        relationWithAdminList.add(new RelationWithAdminModel("Self", getString(R.string.relationship_self)));
        relationWithAdminList.add(new RelationWithAdminModel("Parent", getString(R.string.relationship_parent)));
        relationWithAdminList.add(new RelationWithAdminModel("Child", getString(R.string.relationship_child)));
        relationWithAdminList.add(new RelationWithAdminModel("Sibling", getString(R.string.relationship_sibling)));
        relationWithAdminList.add(new RelationWithAdminModel("Spouse", getString(R.string.relationship_spouse)));

        // Step-family
        relationWithAdminList.add(new RelationWithAdminModel("Stepfather", getString(R.string.relationship_stepfather)));
        relationWithAdminList.add(new RelationWithAdminModel("Stepmother", getString(R.string.relationship_stepmother)));
        relationWithAdminList.add(new RelationWithAdminModel("Stepbrother", getString(R.string.relationship_stepbrother)));
        relationWithAdminList.add(new RelationWithAdminModel("Stepsister", getString(R.string.relationship_stepsister)));
        relationWithAdminList.add(new RelationWithAdminModel("Stepson", getString(R.string.relationship_stepson)));
        relationWithAdminList.add(new RelationWithAdminModel("Stepdaughter", getString(R.string.relationship_stepdaughter)));

        // In-laws
        relationWithAdminList.add(new RelationWithAdminModel("Father-in-law", getString(R.string.relationship_father_in_law)));
        relationWithAdminList.add(new RelationWithAdminModel("Mother-in-law", getString(R.string.relationship_mother_in_law)));
        relationWithAdminList.add(new RelationWithAdminModel("Brother-in-law", getString(R.string.relationship_brother_in_law)));
        relationWithAdminList.add(new RelationWithAdminModel("Sister-in-law", getString(R.string.relationship_sister_in_law)));
        relationWithAdminList.add(new RelationWithAdminModel("Son-in-law", getString(R.string.relationship_son_in_law)));
        relationWithAdminList.add(new RelationWithAdminModel("Daughter-in-law", getString(R.string.relationship_daughter_in_law)));

        // Grand level
        relationWithAdminList.add(new RelationWithAdminModel("Grandfather", getString(R.string.relationship_grandfather)));
        relationWithAdminList.add(new RelationWithAdminModel("Grandmother", getString(R.string.relationship_grandmother)));
        relationWithAdminList.add(new RelationWithAdminModel("Grandson", getString(R.string.relationship_grandson)));
        relationWithAdminList.add(new RelationWithAdminModel("Granddaughter", getString(R.string.relationship_granddaughter)));

        // Great-grand level
        relationWithAdminList.add(new RelationWithAdminModel("Great-grandfather", getString(R.string.relationship_great_grandfather)));
        relationWithAdminList.add(new RelationWithAdminModel("Great-grandmother", getString(R.string.relationship_great_grandmother)));
        relationWithAdminList.add(new RelationWithAdminModel("Great-grandson", getString(R.string.relationship_great_grandson)));
        relationWithAdminList.add(new RelationWithAdminModel("Great-granddaughter", getString(R.string.relationship_great_granddaughter)));

        // Uncle/Aunt and Niece/Nephew lines
        relationWithAdminList.add(new RelationWithAdminModel("Uncle", getString(R.string.relationship_uncle)));
        relationWithAdminList.add(new RelationWithAdminModel("Aunt", getString(R.string.relationship_aunt)));
        relationWithAdminList.add(new RelationWithAdminModel("Great-uncle", getString(R.string.relationship_great_uncle)));
        relationWithAdminList.add(new RelationWithAdminModel("Great-aunt", getString(R.string.relationship_great_aunt)));
        relationWithAdminList.add(new RelationWithAdminModel("Nephew", getString(R.string.relationship_nephew)));
        relationWithAdminList.add(new RelationWithAdminModel("Niece", getString(R.string.relationship_niece)));
        relationWithAdminList.add(new RelationWithAdminModel("Grandnephew", getString(R.string.relationship_grandnephew)));
        relationWithAdminList.add(new RelationWithAdminModel("Grandniece", getString(R.string.relationship_grandniece)));

        // Cousins
        relationWithAdminList.add(new RelationWithAdminModel("First Cousin", getString(R.string.relationship_first_cousin)));
        relationWithAdminList.add(new RelationWithAdminModel("Second Cousin", getString(R.string.relationship_second_cousin)));
        relationWithAdminList.add(new RelationWithAdminModel("Third Cousin", getString(R.string.relationship_third_cousin)));
        relationWithAdminList.add(new RelationWithAdminModel("Cousin Once Removed", getString(R.string.relationship_cousin_once_removed)));
        relationWithAdminList.add(new RelationWithAdminModel("Cousin Twice Removed", getString(R.string.relationship_cousin_twice_removed)));

        // Miscellaneous
        relationWithAdminList.add(new RelationWithAdminModel("Friend", getString(R.string.relationship_friend)));
        relationWithAdminList.add(new RelationWithAdminModel("Guardian", getString(R.string.relationship_guardian)));
        relationWithAdminList.add(new RelationWithAdminModel("Godparent", getString(R.string.relationship_godparent)));
        relationWithAdminList.add(new RelationWithAdminModel("Godchild", getString(R.string.relationship_godchild)));
        relationWithAdminList.add(new RelationWithAdminModel("Adopted Child", getString(R.string.relationship_adopted_child)));
        relationWithAdminList.add(new RelationWithAdminModel("Foster Parent", getString(R.string.relationship_foster_parent)));
        relationWithAdminList.add(new RelationWithAdminModel("Foster Child", getString(R.string.relationship_foster_child)));
        relationWithAdminList.add(new RelationWithAdminModel("Roommate", getString(R.string.relationship_roommate)));
        relationWithAdminList.add(new RelationWithAdminModel("Partner", getString(R.string.relationship_partner)));
        relationWithAdminList.add(new RelationWithAdminModel("Fiancé", getString(R.string.relationship_fiance)));
        relationWithAdminList.add(new RelationWithAdminModel("Ex-Spouse", getString(R.string.relationship_ex_spouse)));
        relationWithAdminList.add(new RelationWithAdminModel("Other", getString(R.string.relationship_other)));

        // Ancestral tree
        relationWithAdminList.add(new RelationWithAdminModel("2nd Great-Grandfather", getString(R.string.relationship_2nd_great_grandfather)));
        relationWithAdminList.add(new RelationWithAdminModel("2nd Great-Grandmother", getString(R.string.relationship_2nd_great_grandmother)));
        relationWithAdminList.add(new RelationWithAdminModel("3rd Great-Grandfather", getString(R.string.relationship_3rd_great_grandfather)));
        relationWithAdminList.add(new RelationWithAdminModel("3rd Great-Grandmother", getString(R.string.relationship_3rd_great_grandmother)));
        relationWithAdminList.add(new RelationWithAdminModel("4th Great-Grandfather", getString(R.string.relationship_4th_great_grandfather)));
        relationWithAdminList.add(new RelationWithAdminModel("4th Great-Grandmother", getString(R.string.relationship_4th_great_grandmother)));
        relationWithAdminList.add(new RelationWithAdminModel("5th Great-Grandfather", getString(R.string.relationship_5th_great_grandfather)));
        relationWithAdminList.add(new RelationWithAdminModel("5th Great-Grandmother", getString(R.string.relationship_5th_great_grandmother)));
        relationWithAdminList.add(new RelationWithAdminModel("6th Great-Grandfather", getString(R.string.relationship_6th_great_grandfather)));
        relationWithAdminList.add(new RelationWithAdminModel("6th Great-Grandmother", getString(R.string.relationship_6th_great_grandmother)));
        relationWithAdminList.add(new RelationWithAdminModel("7th Great-Grandfather", getString(R.string.relationship_7th_great_grandfather)));
        relationWithAdminList.add(new RelationWithAdminModel("7th Great-Grandmother", getString(R.string.relationship_7th_great_grandmother)));
        relationWithAdminList.add(new RelationWithAdminModel("8th Great-Grandfather", getString(R.string.relationship_8th_great_grandfather)));
        relationWithAdminList.add(new RelationWithAdminModel("8th Great-Grandmother", getString(R.string.relationship_8th_great_grandmother)));
        relationWithAdminList.add(new RelationWithAdminModel("9th Great-Grandfather", getString(R.string.relationship_9th_great_grandfather)));
        relationWithAdminList.add(new RelationWithAdminModel("9th Great-Grandmother", getString(R.string.relationship_9th_great_grandmother)));
        relationWithAdminList.add(new RelationWithAdminModel("10th Great-Grandfather", getString(R.string.relationship_10th_great_grandfather)));
        relationWithAdminList.add(new RelationWithAdminModel("10th Great-Grandmother", getString(R.string.relationship_10th_great_grandmother)));
    }
}