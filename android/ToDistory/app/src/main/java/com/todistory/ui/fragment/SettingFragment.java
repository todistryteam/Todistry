package com.todistory.ui.fragment;

import android.content.res.Configuration;
import android.content.res.Resources;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.todistory.R;
import com.todistory.common.Helper;
import com.todistory.databinding.FragmentSettingBinding;

import java.util.Locale;

public class SettingFragment extends Fragment {

    FragmentSettingBinding binding;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        binding = FragmentSettingBinding.inflate(inflater, container, false);
        String lang = Helper.getPreferenceData(getActivity(), "app_lang").equals("") ? "en" : Helper.getPreferenceData(getActivity(), "app_lang");
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
        return binding.getRoot();
    }

    private void changeLanguage(String langCode) {
        Helper.savePreferenceData(getActivity(), "app_lang", langCode);
        Locale locale = new Locale(langCode);
        Locale.setDefault(locale);
        Resources resources = getResources();
        Configuration config = resources.getConfiguration();
        config.setLocale(locale);
        resources.updateConfiguration(config, resources.getDisplayMetrics());
        getActivity().recreate();
    }
}
