//package com.todistory.ui.activity;
//
//import android.Manifest;
//import android.app.AlertDialog;
//import android.app.Dialog;
//import android.content.Intent;
//import android.content.pm.PackageManager;
//import android.graphics.Color;
//import android.graphics.drawable.ColorDrawable;
//import android.net.Uri;
//import android.os.Build;
//import android.os.Bundle;
//import android.util.Log;
//import android.view.View;
//import android.view.Window;
//import android.view.WindowManager;
//import android.widget.Button;
//import android.widget.CheckBox;
//import android.widget.RelativeLayout;
//import android.widget.Toast;
//
//import androidx.annotation.NonNull;
//import androidx.appcompat.app.AppCompatActivity;
//import androidx.core.app.ActivityCompat;
//import androidx.core.app.NotificationManagerCompat;
//import androidx.core.content.ContextCompat;
//
//import com.todistory.BuildConfig;
//import com.todistory.R;
//import com.todistory.common.Helper;
//
//public class WelcomeActivity extends AppCompatActivity {
//
//    Button btnstart, btnsignin;
//    int PERMISSION_CODE = 1002;
//    final int PERMISSION_REQUEST_CODE_NOTIFICATION = 112;
//    int REQUEST_WRITE_EXTERNAL_STORAGE = 1003;
//    int version = android.os.Build.VERSION.SDK_INT;
//    int permissionCheck = 0;
//    boolean isSignInClicked = false;
//
//    @Override
//    protected void onCreate(Bundle savedInstanceState) {
//        super.onCreate(savedInstanceState);
//        requestWindowFeature(Window.FEATURE_NO_TITLE);
//        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN); //show the activity in full screen
//        setContentView(R.layout.activity_welcome);
//        getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
//        getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
//        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
//            getWindow().getAttributes().layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;
//            getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
//        }
//        btnsignin = findViewById(R.id.btnLogin);
//        btnstart = findViewById(R.id.btnStart);
//        btnstart.setOnClickListener(this::showPrivacyDialog);
//        //btnstart.setOnClickListener(v -> getPermission());
//        btnsignin.setOnClickListener(v -> {
//            isSignInClicked = true;
//            if (Helper.getBooleanPreferenceData(WelcomeActivity.this, "ApplyPrivacy") &&
//                    Helper.getBooleanPreferenceData(WelcomeActivity.this, "AcceptTerms")) {
//                Intent intent = new Intent(WelcomeActivity.this, SignInActivity.class);
//                startActivity(intent);
//            } else {
//                showPrivacyDialog(v);
//            }
//        });
//    }
//
//    public void showPrivacyDialog(View view) {
//        final Dialog dialog = new Dialog(WelcomeActivity.this);
//        dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
//        dialog.setCancelable(true);
//        dialog.setContentView(R.layout.privacy_policy_dialog);
//        dialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
//        dialog.getWindow().setLayout(WindowManager.LayoutParams.MATCH_PARENT, WindowManager.LayoutParams.WRAP_CONTENT);
//        RelativeLayout rlOK = dialog.findViewById(R.id.rlOK);
//        CheckBox cbTerms = dialog.findViewById(R.id.cbTerms);
//        cbTerms.setOnCheckedChangeListener((buttonView, isChecked) -> {
//            if (buttonView.isPressed()) {
//                if (isChecked) {
//                    rlOK.setClickable(true);
//                    rlOK.setEnabled(true);
//                    rlOK.setOnClickListener(v -> {
//                        showTermsDialog(view);
//                        dialog.dismiss();
//                    });
//                }
//            } else {
//                rlOK.setClickable(false);
//                rlOK.setEnabled(false);
//            }
//        });
//        dialog.show();
//    }
//
//    public void getNotificationPermission() {
//        try {
//            if (Build.VERSION.SDK_INT > 32) {
//                if (this.checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
//                    ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.POST_NOTIFICATIONS}, PERMISSION_REQUEST_CODE_NOTIFICATION);
//                }
//            }
//        } catch (Exception e) {
//            showToastMessage(e.toString());
//        }
//    }
//
//    @Override
//    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
//        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
//        int version = Build.VERSION.SDK_INT;
//        if (requestCode == REQUEST_WRITE_EXTERNAL_STORAGE) {
//            if ((grantResults.length > 0) && (grantResults[0] == PackageManager.PERMISSION_GRANTED)) {
//                if (isSignInClicked) {
//                    Helper.saveBooleanPreferenceData(WelcomeActivity.this, "IsPermissionGrant", true);
//                    Helper.saveBooleanPreferenceData(WelcomeActivity.this, "ApplyPrivacy", true);
//                    Helper.saveBooleanPreferenceData(WelcomeActivity.this, "AcceptTerms", true);
//                    Intent intent = new Intent(WelcomeActivity.this, SignInActivity.class);
//                    startActivity(intent);
//                } else {
//                    Helper.saveBooleanPreferenceData(WelcomeActivity.this, "IsPermissionGrant", true);
//                    Helper.saveBooleanPreferenceData(WelcomeActivity.this, "ApplyPrivacy", true);
//                    Helper.saveBooleanPreferenceData(WelcomeActivity.this, "AcceptTerms", true);
//                    Intent intent = new Intent(WelcomeActivity.this, MainActivity.class);
//                    startActivity(intent);
//                    finish();
//                }
//            } else {
//                ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE}, REQUEST_WRITE_EXTERNAL_STORAGE);
//            }
//        } else if (requestCode == PERMISSION_CODE) {
//            if (version <= 32) {
//                if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED && grantResults[1] == PackageManager.PERMISSION_GRANTED &&
//                        grantResults[2] == PackageManager.PERMISSION_GRANTED) {
//                    if (Build.VERSION.SDK_INT > 32) {
//                        if (NotificationManagerCompat.from(this).areNotificationsEnabled()) {
//                            Log.e("Todistory: ", "Notification is on1");
//                        } else {
//                            if (!shouldShowRequestPermissionRationale("112")) {
//                                getNotificationPermission();
//                            }
//                        }
//                    }
//                } else {
//                    AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(this);
//                    alertDialogBuilder.setMessage("This app needs you to allow this permission in order to function.");
//                    alertDialogBuilder.setPositiveButton("OK",
//                            (arg0, arg1) -> {
//                                startActivity(new Intent(android.provider.Settings.ACTION_APPLICATION_DETAILS_SETTINGS, Uri.parse("package:" + BuildConfig.APPLICATION_ID)));
//                            });
//                    AlertDialog alertDialog = alertDialogBuilder.create();
//                    alertDialog.show();
//                }
//            } else {
//                if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED && grantResults[1] == PackageManager.PERMISSION_GRANTED
//                        && grantResults[2] == PackageManager.PERMISSION_GRANTED) {
//                    if (Build.VERSION.SDK_INT > 32) {
//                        if (NotificationManagerCompat.from(this).areNotificationsEnabled()) {
//                            Log.e("Todistory: ", "Notification is on2");
//                        } else {
//                            if (!shouldShowRequestPermissionRationale("112")) {
//                                getNotificationPermission();
//                            }
//                        }
//                    }
//                } else {
//                    if (Build.VERSION.SDK_INT > 32) {
//                        if (NotificationManagerCompat.from(this).areNotificationsEnabled()) {
//                            Log.e("Todistory: ", "Notification is on3");
//                        } else {
//                            if (!shouldShowRequestPermissionRationale("112")) {
//                                getNotificationPermission();
//                            }
//                        }
//                    }
//                }
//            }
//        } else if (requestCode == PERMISSION_REQUEST_CODE_NOTIFICATION) {
//            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
//                showToastMessage("Permission Granted!");
//                if (isSignInClicked) {
//                    Helper.saveBooleanPreferenceData(WelcomeActivity.this, "IsPermissionGrant", true);
//                    Helper.saveBooleanPreferenceData(WelcomeActivity.this, "ApplyPrivacy", true);
//                    Helper.saveBooleanPreferenceData(WelcomeActivity.this, "AcceptTerms", true);
//                    Intent intent = new Intent(WelcomeActivity.this, SignInActivity.class);
//                    startActivity(intent);
//                } else {
//                    Helper.saveBooleanPreferenceData(WelcomeActivity.this, "IsPermissionGrant", true);
//                    Helper.saveBooleanPreferenceData(WelcomeActivity.this, "ApplyPrivacy", true);
//                    Helper.saveBooleanPreferenceData(WelcomeActivity.this, "AcceptTerms", true);
//                    Intent intent = new Intent(WelcomeActivity.this, MainActivity.class);
//                    startActivity(intent);
//                    finish();
//                }
//            } else {
//                AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(this);
//                alertDialogBuilder.setMessage("This app needs you to allow this permission in order to function.");
//                alertDialogBuilder.setPositiveButton("OK",
//                        (arg0, arg1) -> {
//                            startActivity(new Intent(android.provider.Settings.ACTION_APPLICATION_DETAILS_SETTINGS, Uri.parse("package:" + BuildConfig.APPLICATION_ID)));
//                        });
//                AlertDialog alertDialog = alertDialogBuilder.create();
//                alertDialog.show();
//            }
//        }
//    }
//
//    public void showToastMessage(String message) {
//        if (message != null) {
//            Toast.makeText(this, message, Toast.LENGTH_LONG).show();
//        }
//    }
//
//    public void getPermission() {
//        if (version <= 32) {
//            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
//                permissionCheck = ContextCompat.checkSelfPermission(this, Manifest.permission.WRITE_EXTERNAL_STORAGE);
//            }
//            if (permissionCheck != PackageManager.PERMISSION_GRANTED) {
//                ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE}, REQUEST_WRITE_EXTERNAL_STORAGE);
//            } else {
//                if (isSignInClicked) {
//                    Helper.saveBooleanPreferenceData(WelcomeActivity.this, "IsPermissionGrant", true);
//                    Helper.saveBooleanPreferenceData(WelcomeActivity.this, "ApplyPrivacy", true);
//                    Helper.saveBooleanPreferenceData(WelcomeActivity.this, "AcceptTerms", true);
//                    Intent intent = new Intent(WelcomeActivity.this, SignInActivity.class);
//                    startActivity(intent);
//                } else {
//                    Helper.saveBooleanPreferenceData(WelcomeActivity.this, "IsPermissionGrant", true);
//                    Helper.saveBooleanPreferenceData(WelcomeActivity.this, "ApplyPrivacy", true);
//                    Helper.saveBooleanPreferenceData(WelcomeActivity.this, "AcceptTerms", true);
//                    Intent intent = new Intent(WelcomeActivity.this, MainActivity.class);
//                    startActivity(intent);
//                    finish();
//                }
//            }
//        } else {
//            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.M) {
//                if (checkSelfPermission(Manifest.permission.READ_EXTERNAL_STORAGE) == PackageManager.PERMISSION_DENIED &&
//                        checkSelfPermission(Manifest.permission.WRITE_EXTERNAL_STORAGE) == PackageManager.PERMISSION_DENIED &&
//                        checkSelfPermission(Manifest.permission.READ_MEDIA_IMAGES) == PackageManager.PERMISSION_DENIED
//                ) {
//                    String[] permissions = {
//                            Manifest.permission.READ_EXTERNAL_STORAGE,
//                            Manifest.permission.WRITE_EXTERNAL_STORAGE,
//                            Manifest.permission.READ_MEDIA_IMAGES
//                    };
//                    requestPermissions(permissions, PERMISSION_CODE);
//                } else {
//                    if (isSignInClicked) {
//                        Helper.saveBooleanPreferenceData(WelcomeActivity.this, "IsPermissionGrant", true);
//                        Helper.saveBooleanPreferenceData(WelcomeActivity.this, "ApplyPrivacy", true);
//                        Helper.saveBooleanPreferenceData(WelcomeActivity.this, "AcceptTerms", true);
//                        Intent intent = new Intent(WelcomeActivity.this, SignInActivity.class);
//                        startActivity(intent);
//                    } else {
//                        Helper.saveBooleanPreferenceData(WelcomeActivity.this, "IsPermissionGrant", true);
//                        Helper.saveBooleanPreferenceData(WelcomeActivity.this, "ApplyPrivacy", true);
//                        Helper.saveBooleanPreferenceData(WelcomeActivity.this, "AcceptTerms", true);
//                        Intent intent = new Intent(WelcomeActivity.this, MainActivity.class);
//                        startActivity(intent);
//                        finish();
//                    }
//                }
//            }
//        }
//    }
//
//    public void showTermsDialog(View view) {
//        final Dialog dialog = new Dialog(WelcomeActivity.this);
//        dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
//        dialog.setCancelable(true);
//        dialog.setContentView(R.layout.terms_dialog);
//        dialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
//        dialog.getWindow().setLayout(WindowManager.LayoutParams.MATCH_PARENT, WindowManager.LayoutParams.WRAP_CONTENT);
//        RelativeLayout rlAccept = dialog.findViewById(R.id.rlAccept);
//        rlAccept.setOnClickListener(v -> {
//            dialog.dismiss();
//            getPermission();
//        });
//        dialog.show();
//    }
//}


package com.todistory.ui.activity;

import android.Manifest;
import android.app.AlertDialog;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.todistory.R;

import java.util.ArrayList;
import java.util.List;

public class WelcomeActivity extends AppCompatActivity {

    Button btnstart, btnsignin;
    boolean isSignInClicked = false;
    private static final int PERMISSION_CODE = 1001;
    private final String[] PERMISSIONS_BELOW_13 = {
            Manifest.permission.READ_EXTERNAL_STORAGE,
            Manifest.permission.WRITE_EXTERNAL_STORAGE
    };

    private final String[] PERMISSIONS_ABOVE_13 = {
            Manifest.permission.READ_MEDIA_IMAGES,
            Manifest.permission.POST_NOTIFICATIONS
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN); //show the activity in full screen
        setContentView(R.layout.activity_welcome);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            getWindow().getAttributes().layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;
            getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
        }
        btnsignin = findViewById(R.id.btnLogin);
        btnstart = findViewById(R.id.btnStart);
        btnstart.setOnClickListener(v -> {
            getPermissions();
        });
        btnsignin.setOnClickListener(v -> {
            isSignInClicked = true;
            getPermissions();
        });
    }


    public void getPermissions() {
        List<String> permissionsToRequest = new ArrayList<>();

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            // Android 13+
            for (String perm : PERMISSIONS_ABOVE_13) {
                if (ContextCompat.checkSelfPermission(this, perm) != PackageManager.PERMISSION_GRANTED) {
                    permissionsToRequest.add(perm);
                }
            }
        } else {
            // Below Android 13
            for (String perm : PERMISSIONS_BELOW_13) {
                if (ContextCompat.checkSelfPermission(this, perm) != PackageManager.PERMISSION_GRANTED) {
                    permissionsToRequest.add(perm);
                }
            }
        }

        if (!permissionsToRequest.isEmpty()) {
            ActivityCompat.requestPermissions(this,
                    permissionsToRequest.toArray(new String[0]),
                    PERMISSION_CODE);
        } else {
            // All permissions already granted
            onAllPermissionsGranted();
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);

        if (requestCode == PERMISSION_CODE) {
            boolean allGranted = true;
            for (int result : grantResults) {
                if (result != PackageManager.PERMISSION_GRANTED) {
                    allGranted = false;
                    break;
                }
            }

            if (allGranted) {
                onAllPermissionsGranted();
            } else {
                showPermissionSettingsDialog("Please enable all required permissions for the app to function correctly.");
            }
        }
    }

    private void onAllPermissionsGranted() {
        if (isSignInClicked) {
            isSignInClicked = false;
            Intent intent = new Intent(WelcomeActivity.this, SignInActivity.class);
            startActivity(intent);
        } else {
            Intent intent = new Intent(WelcomeActivity.this, MainActivity.class);
            startActivity(intent);
        }
    }

    private void showPermissionSettingsDialog(String message) {
        new AlertDialog.Builder(this)
                .setTitle("Permission Required")
                .setMessage(message)
                .setPositiveButton("Go to Settings", (dialog, which) -> {
                    Intent intent = new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
                    intent.setData(Uri.parse("package:" + getPackageName()));
                    startActivity(intent);
                })
                .setNegativeButton("Cancel", null)
                .show();
    }

    public void showToastMessage(String message) {
        if (message != null) {
            Toast.makeText(this, message, Toast.LENGTH_LONG).show();
        }
    }
}