
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

enum PostStatus { uploading, published, failed }

class PostStatusScreen extends StatefulWidget {

  final PostStatus initialStatus;

  const PostStatusScreen({super.key, this.initialStatus = PostStatus.uploading});

  @override

  State<PostStatusScreen> createState() => _PostStatusScreenState();

}

class _PostStatusScreenState extends State<PostStatusScreen> {

  late PostStatus _currentStatus;

  double _progress = 0.65;

  @override

  void initState() {

    super.initState();

    _currentStatus = widget.initialStatus;

    

    // Auto-advance for demonstration

    if (_currentStatus == PostStatus.uploading) {

      Future.delayed(const Duration(seconds: 3), () {

        if (mounted) setState(() { _progress = 1.0; _currentStatus = PostStatus.published; });

      });

    }

  }

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: Colors.black54, // Dim background

      body: Center(

        child: Container(

          width: 340,

          padding: const EdgeInsets.all(32),

          decoration: BoxDecoration(

            color: isDark ? AppTheme.cardDark : Colors.white,

            borderRadius: BorderRadius.circular(32),

          ),

          child: Column(

            mainAxisSize: MainAxisSize.min,

            children: [

              if (_currentStatus == PostStatus.uploading) _buildUploadingState(isDark),

              if (_currentStatus == PostStatus.published) _buildPublishedState(isDark),

              if (_currentStatus == PostStatus.failed) _buildFailedState(isDark),

            ],

          ),

        ),

      ),

    );

  }

  Widget _buildUploadingState(bool isDark) {

    return Column(

      children: [

        const Text('Uploading...', style: TextStyle(fontSize: 22, fontWeight: FontWeight.w900, fontFamily: 'Public Sans', letterSpacing: -0.5)),

        const SizedBox(height: 12),

        Text('Uploading your campus update...', style: TextStyle(color: Colors.grey[500], fontSize: 13)),

        const SizedBox(height: 32),

        Stack(

          alignment: Alignment.center,

          children: [

            ClipRRect(

              borderRadius: BorderRadius.circular(20),

              child: Image.network(r'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?w=400', height: 160, width: double.infinity, fit: BoxFit.cover),

            ),

            Container(

              width: 80,

              height: 80,

              decoration: BoxDecoration(color: Colors.black45, shape: BoxShape.circle, border: Border.all(color: Colors.white24, width: 2)),

              child: Center(child: Text('${(_progress * 100).toInt()}%', style: const TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold))),

            ),

          ],

        ),

        const SizedBox(height: 24),

        ClipRRect(

          borderRadius: BorderRadius.circular(4),

          child: LinearProgressIndicator(value: _progress, minHeight: 8, backgroundColor: Colors.grey[200], color: const Color(0xFF00A870)),

        ),

        const SizedBox(height: 16),

        Row(

          mainAxisAlignment: MainAxisAlignment.spaceBetween,

          children: [

            Row(

              children: [

                Icon(Icons.cloud_upload_outlined, color: Color(0xFF007A5E), size: 14),

                SizedBox(width: 8),

                Text('MEDIA PROCESSING', style: TextStyle(color: Color(0xFF007A5E), fontSize: 9, fontWeight: FontWeight.w900, letterSpacing: 0.5)),

              ],

            ),

            Text('3.2 MB / 4.8 MB', style: TextStyle(color: Colors.grey[400], fontSize: 10, fontWeight: FontWeight.bold)),

          ],

        ),

        const SizedBox(height: 32),

        OutlinedButton(

          onPressed: () => Navigator.pop(context),

          style: OutlinedButton.styleFrom(minimumSize: const Size(double.infinity, 56), side: BorderSide(color: Colors.grey[200]!), shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16))),

          child: const Text('Cancel', style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold)),

        ),

      ],

    );

  }

  Widget _buildPublishedState(bool isDark) {

    return Column(

      children: [

        const Text('Post Published!', style: TextStyle(fontSize: 22, fontWeight: FontWeight.w900, fontFamily: 'Public Sans', letterSpacing: -0.5)),

        const SizedBox(height: 32),

        Container(

          width: 100,

          height: 100,

          decoration: BoxDecoration(color: Color(0xFFC0FBD8), shape: BoxShape.circle),

          child: const Icon(Icons.check_circle, color: Color(0xFF007A5E), size: 50),

        ),

        const SizedBox(height: 32),

        ElevatedButton(

          onPressed: () => Navigator.pop(context),

          style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF008D58), foregroundColor: Colors.white, minimumSize: const Size(double.infinity, 56), shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)), elevation: 0),

          child: const Text('View Post', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

        ),

        const SizedBox(height: 12),

        TextButton(onPressed: () => Navigator.pop(context), child: const Text('Close', style: TextStyle(color: Colors.grey, fontWeight: FontWeight.bold))),

      ],

    );

  }

  Widget _buildFailedState(bool isDark) {

    return Column(

      children: [

        const Text('Upload Failed', style: TextStyle(fontSize: 22, fontWeight: FontWeight.w900, fontFamily: 'Public Sans', letterSpacing: -0.5)),

        const SizedBox(height: 32),

        const Icon(Icons.error_outline, color: Color(0xFFD32F2F), size: 80),

        const SizedBox(height: 24),

        Text('We couldn\'t upload your post. Please check your connection and try again.', textAlign: TextAlign.center, style: TextStyle(color: Colors.grey[500], fontSize: 14)),

        const SizedBox(height: 32),

        ElevatedButton(

          onPressed: () => setState(() => _currentStatus = PostStatus.uploading),

          style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFFD32F2F), foregroundColor: Colors.white, minimumSize: const Size(double.infinity, 56), shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)), elevation: 0),

          child: const Text('Try Again', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

        ),

        const SizedBox(height: 12),

        TextButton(onPressed: () => Navigator.pop(context), child: const Text('Save to Drafts', style: TextStyle(color: Colors.grey, fontWeight: FontWeight.bold))),

      ],

    );

  }

}
