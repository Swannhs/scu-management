
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

class DeletePostConfirmationScreen extends StatelessWidget {

  const DeletePostConfirmationScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : const Color(0xFFFBFDFF),

      appBar: AppBar(

        leading: IconButton(icon: const Icon(Icons.arrow_back), onPressed: () => Navigator.pop(context)),

        title: const Text('Delete Post', style: TextStyle(color: Color(0xFF00A870), fontWeight: FontWeight.bold, fontSize: 18)),

        backgroundColor: Colors.transparent,

        elevation: 0,

      ),

      body: Padding(

        padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 60),

        child: Column(

          children: [

            Container(

              padding: const EdgeInsets.all(24),

              decoration: BoxDecoration(color: Color(0xFFFFEBEE), shape: BoxShape.circle),

              child: const Icon(Icons.delete, color: Color(0xFFD32F2F), size: 40),

            ),

            const SizedBox(height: 32),

            const Text('Delete this post?', style: TextStyle(fontSize: 24, fontWeight: FontWeight.w900, fontFamily: 'Public Sans', letterSpacing: -0.5)),

            const SizedBox(height: 16),

            Text(

              'Are you sure you want to delete this post?\nThis action cannot be undone.',

              textAlign: TextAlign.center,

              style: TextStyle(color: Colors.grey[500], fontSize: 14, height: 1.6),

            ),

            const SizedBox(height: 48),

            _buildPostPreview(isDark),

            const Spacer(),

            ElevatedButton(

              onPressed: () => Navigator.pop(context),

              style: ElevatedButton.styleFrom(

                backgroundColor: const Color(0xFFC62828),

                foregroundColor: Colors.white,

                minimumSize: const Size(double.infinity, 56),

                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),

                elevation: 0,

              ),

              child: const Text('Delete Post', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

            ),

            const SizedBox(height: 12),

            TextButton(

              onPressed: () => Navigator.pop(context),

              style: TextButton.styleFrom(

                minimumSize: const Size(double.infinity, 56),

                backgroundColor: isDark ? Colors.white10 : const Color(0xFFF1F5F9),

                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),

              ),

              child: const Text('Cancel', style: TextStyle(color: Colors.black87, fontWeight: FontWeight.bold)),

            ),

          ],

        ),

      ),

    );

  }

  Widget _buildPostPreview(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(color: isDark ? AppTheme.cardDark : Colors.white, borderRadius: BorderRadius.circular(16), border: Border.all(color: Colors.black.withOpacity(0.02))),

      child: Row(

        children: [

          Container(

            width: 80,

            height: 80,

            decoration: BoxDecoration(color: const Color(0xFFF1F5F9), borderRadius: BorderRadius.circular(12)),

            child: const Icon(Icons.thumb_up_rounded, color: Colors.orange, size: 32),

          ),

          const SizedBox(width: 16),

          Expanded(

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                const Text('PREVIEW', style: TextStyle(color: Colors.grey, fontSize: 9, fontWeight: FontWeight.w900, letterSpacing: 0.5)),

                const SizedBox(height: 6),

                Text(

                  'Deeply inspired by this quote today as we push the boundaries of what we...',

                  style: TextStyle(color: Colors.grey[600], fontSize: 13, height: 1.4, fontWeight: FontWeight.bold),

                  maxLines: 2,

                  overflow: TextOverflow.ellipsis,

                ),

              ],

            ),

          ),

        ],

      ),

    );

  }

}
