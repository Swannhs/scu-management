
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

class MediaViewerScreen extends StatelessWidget {

  final bool isVideo;

  const MediaViewerScreen({super.key, this.isVideo = false});

  @override

  Widget build(BuildContext context) {

    return Scaffold(

      backgroundColor: Colors.black,

      body: SafeArea(

        child: Column(

          children: [

            _buildHeader(context),

            Expanded(

              child: Stack(

                alignment: Alignment.center,

                children: [

                   _buildMedia(),

                   if (isVideo) const CircleAvatar(radius: 40, backgroundColor: Colors.black45, child: Icon(Icons.play_arrow, color: Colors.white, size: 50)),

                   _buildBottomOverlay(),

                ],

              ),

            ),

            _buildBottomActions(),

          ],

        ),

      ),

    );

  }

  Widget _buildHeader(BuildContext context) {

    return Padding(

      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),

      child: Row(

        mainAxisAlignment: MainAxisAlignment.spaceBetween,

        children: [

          IconButton(icon: const Icon(Icons.close, color: Colors.white), onPressed: () => Navigator.pop(context)),

          const Text('1 of 12', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 16)),

          IconButton(icon: const Icon(Icons.more_horiz, color: Colors.white), onPressed: () {}),

        ],

      ),

    );

  }

  Widget _buildMedia() {

    return Image.network(

      isVideo ? 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200' : 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200',

      fit: BoxFit.contain,

      width: double.infinity,

      height: double.infinity,

    );

  }

  Widget _buildBottomOverlay() {

    return Positioned(

      bottom: 0,

      left: 0,

      right: 0,

      child: Container(

        padding: const EdgeInsets.all(24),

        decoration: BoxDecoration(

          gradient: LinearGradient(begin: Alignment.bottomCenter, end: Alignment.topCenter, colors: [Colors.black.withOpacity(0.8), Colors.transparent]),

        ),

        child: Column(

          crossAxisAlignment: CrossAxisAlignment.start,

          children: [

            Row(

              children: [

                Container(padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4), decoration: BoxDecoration(color: const Color(0xFF00A870), borderRadius: BorderRadius.circular(8)), child: const Text('HACKATHON \'24', style: TextStyle(color: Colors.white, fontSize: 9, fontWeight: FontWeight.w900, letterSpacing: 0.5))),

                const SizedBox(width: 12),

                const Text('2 hours ago', style: TextStyle(color: Colors.white54, fontSize: 11, fontWeight: FontWeight.bold)),

              ],

            ),

            const SizedBox(height: 16),

            const Text('The hackathon kickoff was absolutely amazing! 🚀', style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold, letterSpacing: -0.5)),

            const SizedBox(height: 8),

            const Text('Our team finally started working on the "Campus Connect" project. The energy in the main hall is...', style: TextStyle(color: Colors.white70, fontSize: 13, height: 1.5)),

            const SizedBox(height: 24),

            Row(

              children: [

                const Icon(Icons.favorite, color: Colors.white, size: 20),

                const SizedBox(width: 8),

                const Text('1.2k', style: TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold)),

                const SizedBox(width: 24),

                const Icon(Icons.chat_bubble, color: Colors.white, size: 20),

                const SizedBox(width: 8),

                const Text('84', style: TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold)),

              ],

            ),

          ],

        ),

      ),

    );

  }

  Widget _buildBottomActions() {

    return Container(

      padding: const EdgeInsets.symmetric(vertical: 20),

      child: Row(

        mainAxisAlignment: MainAxisAlignment.spaceAround,

        children: [

          _buildViewerAction(Icons.file_download_outlined, 'Save'),

          _buildViewerAction(Icons.share, 'Share', isActive: true),

          _buildViewerAction(Icons.info_outline, 'Details'),

        ],

      ),

    );

  }

  Widget _buildViewerAction(IconData icon, String label, {bool isActive = false}) {

    return Column(

      children: [

        Container(padding: const EdgeInsets.all(12), decoration: BoxDecoration(color: isActive ? const Color(0xFF007A5E).withOpacity(0.3) : Colors.transparent, borderRadius: BorderRadius.circular(16)), child: Icon(icon, color: isActive ? const Color(0xFF00A870) : Colors.white, size: 24)),

        const SizedBox(height: 8),

        Text(label, style: TextStyle(color: isActive ? const Color(0xFF00A870) : Colors.white70, fontSize: 10, fontWeight: FontWeight.bold)),

      ],

    );

  }

}
