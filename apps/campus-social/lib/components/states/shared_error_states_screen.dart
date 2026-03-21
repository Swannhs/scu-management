
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

class SharedErrorStatesScreen extends StatelessWidget {

  const SharedErrorStatesScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : const Color(0xFFFBFDFF),

      appBar: AppBar(

        title: const Text('Social Service', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18, color: Color(0xFF007A5E))),

        leading: IconButton(icon: const Icon(Icons.arrow_back, color: Color(0xFF007A5E)), onPressed: () => Navigator.pop(context)),

        actions: [

          IconButton(icon: const Icon(Icons.help_outline, color: Color(0xFF007A5E)), onPressed: () {}),

        ],

        backgroundColor: Colors.transparent,

        elevation: 0,

      ),

      body: SingleChildScrollView(

        child: Padding(

          padding: const EdgeInsets.all(24.0),

          child: Column(

            children: [

              _buildFullScreenError(isDark),

              const SizedBox(height: 64),

              Row(

                children: [

                   Text('ERROR PATTERNS', style: TextStyle(color: Colors.grey, fontSize: 11, fontWeight: FontWeight.bold, letterSpacing: 1)),

                   Expanded(child: Divider(indent: 16)),

                ],

              ),

              const SizedBox(height: 32),

              _buildInlineErrorCard(

                'Upload failed',

                'Your service proof couldn\'t be uploaded. Check your file size or format.',

                'Retry Upload',

                Icons.cloud_off,

                const Color(0xFFFFE3E3),

                const Color(0xFFD32F2F),

                isDark,

              ),

              const SizedBox(height: 24),

              _buildConnectionErrorCard(isDark),

              const SizedBox(height: 48),

              _buildSystemNote(isDark),

              const SizedBox(height: 100),

            ],

          ),

        ),

      ),

    );

  }

  Widget _buildFullScreenError(bool isDark) {

    return Column(

      children: [

        Container(

          width: 180,

          height: 180,

          decoration: BoxDecoration(color: Colors.white, shape: BoxShape.circle, boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 20)]),

          child: const Icon(Icons.search_off, size: 80, color: Color(0xFF00A870)),

        ),

        const SizedBox(height: 40),

        const Text(

          'Something went wrong',

          style: TextStyle(fontSize: 26, fontWeight: FontWeight.w900, fontFamily: 'Public Sans', letterSpacing: -0.5),

          textAlign: TextAlign.center,

        ),

        const SizedBox(height: 16),

        Padding(

          padding: const EdgeInsets.symmetric(horizontal: 24.0),

          child: Text(

            'We\'re having trouble loading the volunteer opportunities. Take a deep breath while we try to reconnect.',

            style: TextStyle(color: Colors.grey[500], fontSize: 14, height: 1.5),

            textAlign: TextAlign.center,

          ),

        ),

        const SizedBox(height: 40),

        ElevatedButton(

          onPressed: () {},

          style: ElevatedButton.styleFrom(

            backgroundColor: const Color(0xFF008D58),

            foregroundColor: Colors.white,

            minimumSize: const Size(double.infinity, 56),

            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),

            elevation: 0,

          ),

          child: const Text('Retry', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

        ),

        const SizedBox(height: 16),

        TextButton(

          onPressed: () {},

          child: const Text('Contact Support', style: TextStyle(color: Colors.grey, fontWeight: FontWeight.bold)),

        ),

      ],

    );

  }

  Widget _buildInlineErrorCard(String title, String body, String btnText, IconData icon, Color iconBg, Color iconFg, bool isDark) {

    return Container(

      padding: const EdgeInsets.all(24),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(24),

        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 10)],

      ),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          Row(

            children: [

              Container(

                padding: const EdgeInsets.all(12),

                decoration: BoxDecoration(color: iconBg, borderRadius: BorderRadius.circular(12)),

                child: Icon(icon, color: iconFg, size: 24),

              ),

              const SizedBox(width: 16),

              Expanded(

                child: Column(

                  crossAxisAlignment: CrossAxisAlignment.start,

                  children: [

                    Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

                  ],

                ),

              ),

            ],

          ),

          const SizedBox(height: 12),

          Text(body, style: TextStyle(color: Colors.grey[600], fontSize: 13, height: 1.4)),

          const SizedBox(height: 24),

          Row(

            children: [

              Expanded(

                child: ElevatedButton(

                  onPressed: () {},

                  style: ElevatedButton.styleFrom(

                    backgroundColor: const Color(0xFF008D58),

                    foregroundColor: Colors.white,

                    minimumSize: const Size(0, 48),

                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),

                    elevation: 0,

                  ),

                  child: Text(btnText, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),

                ),

              ),

              const SizedBox(width: 12),

              OutlinedButton(

                onPressed: () {},

                style: OutlinedButton.styleFrom(

                  foregroundColor: Colors.grey,

                  side: BorderSide(color: Colors.grey[200]!),

                  minimumSize: const Size(0, 48),

                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),

                ),

                child: const Text('Support'),

              ),

            ],

          ),

        ],

      ),

    );

  }

  Widget _buildConnectionErrorCard(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(24),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(24),

        border: const Border(left: BorderSide(color: Color(0xFFD32F2F), width: 4)),

      ),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          Row(

            children: [

              Container(

                padding: const EdgeInsets.all(12),

                decoration: BoxDecoration(color: Colors.grey[100], borderRadius: BorderRadius.circular(12)),

                child: const Icon(Icons.signal_wifi_off, color: Colors.grey, size: 24),

              ),

              const SizedBox(width: 16),

              Column(

                crossAxisAlignment: CrossAxisAlignment.start,

                children: [

                  Text('Connection lost', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

                  SizedBox(height: 4),

                  Row(

                    children: [

                      Icon(Icons.diamond, color: Colors.red, size: 10),

                      SizedBox(width: 4),

                      Text('OFFLINE MODE', style: TextStyle(color: Colors.grey, fontSize: 10, fontWeight: FontWeight.bold)),

                    ],

                  ),

                ],

              ),

            ],

          ),

          const SizedBox(height: 16),

          Text(

            'Please check your internet connection to access the latest social service alerts.',

            style: TextStyle(color: Colors.grey[600], fontSize: 13, height: 1.4),

          ),

          const SizedBox(height: 24),

          ElevatedButton(

            onPressed: () {},

            style: ElevatedButton.styleFrom(

              backgroundColor: const Color(0xFF008D58),

              foregroundColor: Colors.white,

              minimumSize: const Size(double.infinity, 48),

              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),

              elevation: 0,

            ),

            child: const Text('Try Again', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),

          ),

        ],

      ),

    );

  }

  Widget _buildSystemNote(bool isDark) {

    return Column(

      children: [

        const Text('VISUAL SYSTEM NOTE', style: TextStyle(color: Colors.grey, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1)),

        const SizedBox(height: 12),

        Text(

          'Use asymmetrical layouts for primary states and standard containers for inline failures to maintain semantic hierarchy.',

          textAlign: TextAlign.center,

          style: TextStyle(color: Colors.grey[500], fontSize: 12, height: 1.5),

        ),

      ],

    );

  }

}
