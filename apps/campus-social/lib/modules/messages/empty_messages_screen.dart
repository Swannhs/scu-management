
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class EmptyMessagesScreen extends StatelessWidget {

  const EmptyMessagesScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : const Color(0xFFFBFDFF),

      appBar: AppBar(

        title: const Text('Messages', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),

        leading: IconButton(icon: const Icon(Icons.menu), onPressed: () {}),

        actions: [

          IconButton(icon: const Icon(Icons.notifications_none), onPressed: () {}),

        ],

        backgroundColor: Colors.transparent,

        elevation: 0,

        foregroundColor: isDark ? Colors.white : Colors.black,

      ),

      body: Center(

        child: Padding(

          padding: const EdgeInsets.symmetric(horizontal: 48.0),

          child: Column(

            mainAxisAlignment: MainAxisAlignment.center,

            children: [

              _buildIllustration(isDark),

              const SizedBox(height: 48),

              const Text(

                'Your Inbox is Empty',

                style: TextStyle(fontSize: 24, fontWeight: FontWeight.w900, fontFamily: 'Public Sans', letterSpacing: -0.5),

                textAlign: TextAlign.center,

              ),

              const SizedBox(height: 16),

              Text(

                'Connect with students and coordinators to start collaborating on your social service projects.',

                style: TextStyle(color: Colors.grey[500], fontSize: 14, height: 1.5),

                textAlign: TextAlign.center,

              ),

              const SizedBox(height: 40),

              ElevatedButton.icon(

                onPressed: () {},

                icon: const Text('Find People ', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

                label: const Icon(Icons.arrow_forward, size: 18),

                style: ElevatedButton.styleFrom(

                  backgroundColor: const Color(0xFF008D58),

                  foregroundColor: Colors.white,

                  minimumSize: const Size(200, 56),

                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),

                  elevation: 0,

                ),

              ),

              const SizedBox(height: 100),

            ],

          ),

        ),

      ),

      bottomNavigationBar: const BottomNav(currentIndex: 3), // Messaging index

    );

  }

  Widget _buildIllustration(bool isDark) {

    return SizedBox(

      width: 200,

      height: 200,

      child: Stack(

        alignment: Alignment.center,

        children: [

          Container(

            width: 140,

            height: 140,

            decoration: BoxDecoration(

              color: isDark ? AppTheme.cardDark : Colors.white,

              borderRadius: BorderRadius.circular(24),

              boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 20, offset: const Offset(0, 8))],

            ),

            child: const Icon(Icons.forum, size: 60, color: Color(0xFF00A870)),

          ),

          Positioned(

            top: 20,

            right: 10,

            child: Container(

              padding: const EdgeInsets.all(8),

              decoration: BoxDecoration(color: const Color(0xFFC0FBD8), borderRadius: BorderRadius.circular(12)),

              child: const Icon(Icons.add, color: Color(0xFF007A5E), size: 18),

            ),

          ),

          Positioned(

            bottom: 30,

            left: 5,

            child: Container(

              padding: const EdgeInsets.all(12),

              decoration: BoxDecoration(color: const Color(0xFFE3FBEF), shape: BoxShape.circle),

              child: const Icon(Icons.send_rounded, color: Color(0xFF007A5E), size: 20),

            ),

          ),

        ],

      ),

    );

  }

}
