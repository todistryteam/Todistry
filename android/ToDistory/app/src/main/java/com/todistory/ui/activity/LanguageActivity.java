package com.todistory.ui.activity;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.content.res.Configuration;
import android.content.res.Resources;
import android.os.Bundle;

import com.todistory.R;
import com.todistory.common.Helper;
import com.todistory.databinding.ActivityLanguageBinding;

import java.util.Locale;

public class LanguageActivity extends BaseActivity {

    ActivityLanguageBinding binding;

    @SuppressLint("NonConstantResourceId")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityLanguageBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
        String lang = Helper.getPreferenceData(this, "app_lang").equals("") ? "en" : Helper.getPreferenceData(this, "app_lang");
        if (lang.equals("es")) {
            binding.rbSpanish.setChecked(true);
        } else {
            binding.rbEnglish.setChecked(true);
        }
        binding.radioGroup.setOnCheckedChangeListener((group, checkedId) -> {
            switch (checkedId) {
                case R.id.rbEnglish:
                    changeLanguage("en");
                    break;
                case R.id.rbSpanish:
                    changeLanguage("es");
                    break;
            }
        });
        binding.btnSubmit.setOnClickListener(v -> {
            Intent intent = new Intent(LanguageActivity.this, WelcomeActivity.class);
            startActivity(intent);
            finish();
        });
    }

    private void changeLanguage(String langCode) {
        Locale locale = new Locale(langCode);
        Locale.setDefault(locale);
        Resources resources = getResources();
        Configuration config = resources.getConfiguration();
        config.setLocale(locale);
        resources.updateConfiguration(config, resources.getDisplayMetrics());
        Helper.savePreferenceData(LanguageActivity.this, "app_lang", langCode);
        binding.txtSelectLanguage.setText(R.string.select_language);
        binding.txtLanguageSelect.setText(R.string.select_language);
        binding.rbEnglish.setText(R.string.english);
        binding.rbSpanish.setText(R.string.spanish);
        binding.btnSubmit.setText(R.string.submit);
    }
}