
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

class PostPreviewScreen extends StatelessWidget {

  final bool isVideo;

  final bool isMultiImage;

  const PostPreviewScreen({super.key, this.isVideo = false, this.isMultiImage = false});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : const Color(0xFFFBFDFF),

      appBar: AppBar(

        leading: IconButton(icon: const Icon(Icons.close), onPressed: () => Navigator.pop(context)),

        title: const Text('New Post', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),

        actions: [

          TextButton(onPressed: () {}, child: const Text('Post', style: TextStyle(color: Color(0xFF00A870), fontWeight: FontWeight.bold, fontSize: 16))),

        ],

        backgroundColor: Colors.transparent,

        elevation: 0,

        centerTitle: true,

      ),

      body: SingleChildScrollView(

        padding: const EdgeInsets.all(24),

        child: Column(

          crossAxisAlignment: CrossAxisAlignment.start,

          children: [

            _buildMainPreview(isDark),

            const SizedBox(height: 16),

            _buildThumbnailStrip(isDark),

            const SizedBox(height: 32),

            const Text('CAPTION', style: TextStyle(color: Colors.grey, fontSize: 11, fontWeight: FontWeight.bold, letterSpacing: 1)),

            const SizedBox(height: 12),

            _buildCaptionInput(isDark),

            const SizedBox(height: 32),

            const Text('DETAILS', style: TextStyle(color: Colors.grey, fontSize: 11, fontWeight: FontWeight.bold, letterSpacing: 1)),

            const SizedBox(height: 16),

            _buildDetailTile(Icons.person_add_alt_1, 'Tag Students', 'Mention friends in this photo', isDark),

            const SizedBox(height: 12),

            _buildDetailTile(Icons.location_on, 'Add Location', 'Main Campus Quad', isDark),

            const SizedBox(height: 12),

            _buildAudienceTile(isDark),

            const SizedBox(height: 48),

            _buildPostButton(),

            const SizedBox(height: 100),

          ],

        ),

      ),

    );

  }

  Widget _buildMainPreview(bool isDark) {

    return Stack(

      children: [

        ClipRRect(

          borderRadius: BorderRadius.circular(24),

          child: Image.network(

            isVideo ? 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800' : 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?w=800',

            height: 350,

            width: double.infinity,

            fit: BoxFit.cover,

          ),

        ),

        if (isVideo)

          const Positioned.fill(

            child: Center(

              child: CircleAvatar(

                radius: 30,

                backgroundColor: Colors.black45,

                child: Icon(Icons.play_arrow, color: Colors.white, size: 40),

              ),

            ),

          ),

        Positioned(

          top: 16,

          right: 16,

          child: CircleAvatar(

            radius: 18,

            backgroundColor: Colors.black45,

            child: IconButton(icon: const Icon(Icons.close, color: Colors.white, size: 18), onPressed: () {}),

          ),

        ),

      ],

    );

  }

  Widget _buildThumbnailStrip(bool isDark) {

    return SizedBox(

      height: 80,

      child: ListView(

        scrollDirection: Axis.horizontal,

        children: [

          Container(

            width: 80,

            margin: const EdgeInsets.only(right: 12),

            decoration: BoxDecoration(

              border: Border.all(color: Colors.grey[300]!, style: BorderStyle.none), // Mocking the dashed border

              borderRadius: BorderRadius.circular(16),

              color: isDark ? Colors.white10 : Colors.white,

            ),

            child: Column(

              mainAxisAlignment: MainAxisAlignment.center,

              children: [

                Icon(Icons.add_a_photo, color: Colors.grey[400], size: 24),

                const SizedBox(height: 4),

                Text('Add More', style: TextStyle(color: Colors.grey[400], fontSize: 9, fontWeight: FontWeight.bold)),

              ],

            ),

          ),

          ...List.generate(3, (index) => Container(

            width: 80,

            margin: const EdgeInsets.only(right: 12),

            decoration: BoxDecoration(

              borderRadius: BorderRadius.circular(16),

              image: DecorationImage(image: NetworkImage('https://picsum.photos/seed/${index + 10}/200'), fit: BoxFit.cover),

            ),

          )),

        ],

      ),

    );

  }

  Widget _buildCaptionInput(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(16),

      decoration: BoxDecoration(color: isDark ? AppTheme.cardDark : Colors.white, borderRadius: BorderRadius.circular(16), border: Border.all(color: Colors.black.withOpacity(0.02))),

      child: TextField(

        maxLines: 4,

        decoration: InputDecoration(

          hintText: 'Write a caption for your campus update...',

          hintStyle: TextStyle(color: Colors.grey[400], fontSize: 14),

          border: InputBorder.none,

        ),

      ),

    );

  }

  Widget _buildDetailTile(IconData icon, String title, String subtitle, bool isDark) {

    return Container(

      padding: const EdgeInsets.all(16),

      decoration: BoxDecoration(color: isDark ? AppTheme.cardDark : Colors.white, borderRadius: BorderRadius.circular(16)),

      child: Row(

        children: [

          Container(padding: const EdgeInsets.all(8), decoration: BoxDecoration(color: const Color(0xFFE3FBEF), borderRadius: BorderRadius.circular(10)), child: Icon(icon, color: const Color(0xFF007A5E), size: 20)),

          const SizedBox(width: 16),

          Expanded(

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),

                const SizedBox(height: 2),

                Text(subtitle, style: TextStyle(color: Colors.grey[400], fontSize: 11)),

              ],

            ),

          ),

          Icon(Icons.chevron_right, color: Colors.grey[400], size: 20),

        ],

      ),

    );

  }

  Widget _buildAudienceTile(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(16),

      decoration: BoxDecoration(color: isDark ? AppTheme.cardDark : Colors.white, borderRadius: BorderRadius.circular(16)),

      child: Row(

        children: [

          Container(padding: const EdgeInsets.all(8), decoration: BoxDecoration(color: const Color(0xFFE3FBEF), borderRadius: BorderRadius.circular(10)), child: const Icon(Icons.group, color: Color(0xFF007A5E), size: 20)),

          const SizedBox(width: 16),

          const Expanded(

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                Text('Audience', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),

                SizedBox(height: 2),

                Text('Public (Everyone on Campus)', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 11)),

              ],

            ),

          ),

          Text('Public', style: TextStyle(color: Colors.grey[400], fontSize: 12, fontWeight: FontWeight.bold)),

          Icon(Icons.arrow_drop_down, color: Colors.grey[400], size: 20),

        ],

      ),

    );

  }

  Widget _buildPostButton() {

    return ElevatedButton(

      onPressed: () {},

      style: ElevatedButton.styleFrom(

        backgroundColor: const Color(0xFF008D58),

        foregroundColor: Colors.white,

        minimumSize: const Size(double.infinity, 56),

        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),

        elevation: 0,

      ),

      child: Row(

        mainAxisAlignment: MainAxisAlignment.center,

        children: [

          Text('Post to Feed ', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

          Icon(Icons.send_rounded, size: 18),

        ],

      ),

    );

  }

}
