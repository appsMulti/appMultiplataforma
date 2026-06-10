package com.example.autorv2

import android.os.Bundle
import android.util.Base64
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.ui.Modifier
import androidx.compose.ui.viewinterop.AndroidView

class MainActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContent {
            AndroidView(
                modifier = Modifier.fillMaxSize().statusBarsPadding(),
                factory = { context ->
                    WebView(context).apply {
                        settings.javaScriptEnabled = true
                        settings.domStorageEnabled = true

                        settings.loadWithOverviewMode = false
                        settings.useWideViewPort = false
                        settings.textZoom = 140

                        webViewClient = object : WebViewClient() {
                            override fun onPageFinished(view: WebView?, url: String?) {
                                super.onPageFinished(view, url)

                                val css = """
                                    html, body, div, table, header, nav {
                                        max-width: 100vw !important;
                                        box-sizing: border-box !important;
                                    }
                                    
                                    header, nav, .navbar, .nav-container, [class*="navbar"], [class*="nav"] {
                                        display: flex !important;
                                        flex-direction: column !important;
                                        align-items: center !important;
                                        justify-content: center !important;
                                        width: 100% !important;
                                        height: auto !important;
                                        padding: 10px 0 !important;
                                        float: none !important;
                                    }
                                    
                                    nav a, .nav-link, .navbar-nav li, .menu-item {
                                        display: block !important;
                                        width: 90% !important;
                                        text-align: center !important;
                                        margin: 6px 0 !important;
                                        padding: 8px !important;
                                        float: none !important;
                                        white-space: normal !important;
                                    }
                                    
                                    ul, ol {
                                        display: flex !important;
                                        flex-direction: column !important;
                                        align-items: center !important;
                                        width: 100% !important;
                                        padding: 0 !important;
                                        list-style: none !important;
                                    }

                                    .dataTables_wrapper, .table-responsive, table {
                                        display: block !important;
                                        width: 100% !important;
                                        overflow-x: auto !important;
                                        white-space: nowrap !important;
                                    }

                                    .dataTables_paginate ul, .pagination, .dataTables_paginate .pagination {
                                        display: flex !important;
                                        flex-direction: row !important; 
                                        justify-content: center !important;
                                        align-items: center !important;
                                        flex-wrap: nowrap !important;
                                        width: auto !important;
                                        margin: 15px auto !important;
                                    }

                                    .dataTables_paginate ul li, .pagination li {
                                        display: inline !important;
                                        margin: 0 2px !important;
                                        width: auto !important;
                                    }
                                """.trimIndent()

                                val encoded = Base64.encodeToString(css.toByteArray(), Base64.NO_WRAP)
                                view?.loadUrl("javascript:(function() {" +
                                        "var parent = document.getElementsByTagName('head')[0];" +
                                        "var style = document.createElement('style');" +
                                        "style.type = 'text/css';" +
                                        "style.innerHTML = window.atob('$encoded');" +
                                        "parent.appendChild(style);" +
                                        "})()")
                            }
                        }

                        loadUrl("http://172.16.16.214:3000")
                    }
                }
            )
        }
    }
}