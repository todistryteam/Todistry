package com.todistory.ui.activity;

import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;

import com.todistory.databinding.ActivityPublishTreeBinding;

public class PublishTreeActivity extends BaseActivity {

    String adminName = "", treeUrl = "";
    ActivityPublishTreeBinding binding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            getWindow().getAttributes().layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;
            getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
        }
        binding = ActivityPublishTreeBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        if (getIntent().hasExtra("AdminName")) {
            adminName = getIntent().getStringExtra("AdminName");
        }
        if (getIntent().hasExtra("treeUrl")) {
            treeUrl = getIntent().getStringExtra("treeUrl");
        }
        binding.rlNext.setOnClickListener(v -> {
            Intent intent = new Intent(PublishTreeActivity.this, MyFamilyTreeActivity.class);
            intent.putExtra("AdminName", adminName);
            intent.putExtra("treeUrl", treeUrl);
            startActivity(intent);
        });
        binding.imgBack.setOnClickListener(v -> {
            onBackPressed();
        });
    }
}