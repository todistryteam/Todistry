package com.todistory.ui.activity;

import android.content.Intent;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import com.todistory.databinding.ActivityMyFamilyTreeBinding;
import com.todistory.ui.activity.announcement.AddAnnouncementActivity;
import com.todistory.ui.activity.home.HomeActivity;
import com.todistory.ui.activity.timecapsule.CreateTimeCapsulePostActivity;
import com.todistory.ui.activity.videochat.VideoChatActivity;

public class MyFamilyTreeActivity extends BaseActivity {

    ActivityMyFamilyTreeBinding binding;
    String adminName = "", treeUrl = "";

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
        binding = ActivityMyFamilyTreeBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
        if (getIntent().hasExtra("AdminName")) {
            adminName = getIntent().getStringExtra("AdminName");
        }
        if (getIntent().hasExtra("treeUrl")) {
            treeUrl = getIntent().getStringExtra("treeUrl");
        }
        binding.tvTitle.setText(adminName.replaceAll("\\s+", "") + "'s family Tree");
        binding.tvTitle.setVisibility(View.GONE);
        binding.imgBack.setOnClickListener(v -> {
            onBackPressed();
        });

        binding.progressIndicator.setVisibility(View.VISIBLE);
        binding.treeWebView.setVisibility(View.GONE);
        binding.treeWebView.clearCache(true);
        binding.treeWebView.clearHistory();
        binding.treeWebView.clearFormData();

        binding.treeWebView.setBackgroundColor(Color.WHITE);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            binding.treeWebView.getSettings().setForceDark(WebSettings.FORCE_DARK_OFF);
        }
        binding.treeWebView.getSettings().setJavaScriptEnabled(true);
        binding.treeWebView.getSettings().setSupportZoom(false);
        binding.treeWebView.getSettings().setBuiltInZoomControls(false);
        binding.treeWebView.getSettings().setDisplayZoomControls(false);
        binding.treeWebView.getSettings().setCacheMode(WebSettings.LOAD_DEFAULT);
        binding.treeWebView.getSettings().setDomStorageEnabled(true);
        binding.treeWebView.getSettings().setUseWideViewPort(true);
        binding.treeWebView.getSettings().setCacheMode(WebSettings.LOAD_CACHE_ELSE_NETWORK);
        binding.treeWebView.getSettings().setLoadWithOverviewMode(true);
        binding.treeWebView.getSettings().setUseWideViewPort(true);
        binding.treeWebView.setOnTouchListener((v, event) -> true);

        binding.treeWebView.setWebViewClient(new WebViewClient() {

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                view.loadUrl(url);
                return true;
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                binding.progressIndicator.setVisibility(View.GONE);
                binding.treeWebView.setVisibility(View.VISIBLE);

            }

            @Override
            public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
                Toast.makeText(MyFamilyTreeActivity.this, description, Toast.LENGTH_SHORT).show();
            }
        });
        binding.treeWebView.loadUrl(treeUrl);

        binding.ivAnnouncement.setOnClickListener(v -> {
            Intent intent = new Intent(MyFamilyTreeActivity.this, AddAnnouncementActivity.class);
            startActivity(intent);
        });

        binding.ivTimeCapsule.setOnClickListener(v -> {
            Intent intent = new Intent(MyFamilyTreeActivity.this, CreateTimeCapsulePostActivity.class);
            startActivity(intent);
        });

        binding.ivVideoChat.setOnClickListener(v -> {
            Intent intent = new Intent(MyFamilyTreeActivity.this, VideoChatActivity.class);
            startActivity(intent);
        });

        binding.ivHome.setOnClickListener(v -> {
            Intent intent = new Intent(MyFamilyTreeActivity.this, HomeActivity.class);
            startActivity(intent);
            finishAffinity();
        });
    }
}