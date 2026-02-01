package com.todistory.ui.activity.announcement;

import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.WindowManager;

import com.todistory.R;
import com.todistory.databinding.ActivityAddAnnouncementBinding;
import com.todistory.ui.activity.BaseActivity;

public class AddAnnouncementActivity extends BaseActivity {
    ActivityAddAnnouncementBinding binding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        binding = ActivityAddAnnouncementBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            getWindow().getAttributes().layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;
            getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
        }
        binding.imgClose.setOnClickListener(v -> {
            onBackPressed();
        });
        binding.ivAnnouncement.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(AddAnnouncementActivity.this, AnnouncementListActivity.class);
                intent.putExtra("ScreenTitle", getString(R.string.announcement));
                startActivity(intent);
            }
        });
        binding.rlPostAnnouncement.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(AddAnnouncementActivity.this, AnnouncementListActivity.class);
                intent.putExtra("ScreenTitle", getString(R.string.announcement));
                startActivity(intent);
            }
        });
    }
}