package com.todistory.ui.activity;

import android.content.Intent;
import android.content.res.Configuration;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.util.DisplayMetrics;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Toast;

import com.todistory.R;
import com.todistory.common.Helper;
import com.todistory.ui.activity.home.HomeActivity;

public class SplashActivity extends BaseActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN); //show the activity in full screen
        adjustFontScale(getResources().getConfiguration());
        setContentView(R.layout.activity_splash);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            getWindow().getAttributes().layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;
            getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
        }

        Handler handler = new Handler();
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
/*
                if (Helper.getBooleanPreferenceData(SplashActivity.this, "ApplyPrivacy") &&
                        Helper.getBooleanPreferenceData(SplashActivity.this, "AcceptTerms")) {

                    if (Helper.getBooleanPreferenceData(SplashActivity.this, "isGetCode")) {
                        Intent intent = new Intent(SplashActivity.this, AdminHomeTreeActivity.class);
                        startActivity(intent);
                        finish();

                    } else {
                        if (Helper.getBooleanPreferenceData(SplashActivity.this, "IsLogin")) {
                            Intent intent = new Intent(SplashActivity.this, MainActivity.class);
                            startActivity(intent);
                            finish();
                        } else {
                            Intent intent = new Intent(SplashActivity.this, SignInActivity.class);
                            startActivity(intent);
                            finish();
                        }
                    }

                } else {
                    Intent intent = new Intent(SplashActivity.this, LanguageActivity.class);
                    startActivity(intent);
                    finish();
                }
*/


                if (Helper.getBooleanPreferenceData(SplashActivity.this, "IsSignUp")) {
//                    Intent intent = new Intent(SplashActivity.this, StartBuildTreeActivity.class);
//                    startActivity(intent);
//                    finish();

                    Intent intent = new Intent(SplashActivity.this, HomeActivity.class);
                    startActivity(intent);
                    finish();

                } else {
                    Intent intent = new Intent(SplashActivity.this, LanguageActivity.class);
                    startActivity(intent);
                    finish();
                }

//                Intent intent = new Intent(SplashActivity.this, TreeWebviewAcivity.class);
//                startActivity(intent);
//                finish();


            }
        }, 4000);

    }

    public void showToastMessage(String msg) {
        Toast.makeText(SplashActivity.this, msg, Toast.LENGTH_LONG).show();
    }


    public void adjustFontScale(Configuration configuration) {
        configuration.fontScale = (float) 1.0;
        DisplayMetrics metrics = getResources().getDisplayMetrics();
        WindowManager wm = (WindowManager) getSystemService(WINDOW_SERVICE);
        wm.getDefaultDisplay().getMetrics(metrics);
        metrics.scaledDensity = configuration.fontScale * metrics.density;
        getBaseContext().getResources().updateConfiguration(configuration, metrics);
    }
}