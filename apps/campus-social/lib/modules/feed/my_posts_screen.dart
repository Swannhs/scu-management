
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class MyPostsScreen extends StatelessWidget {

  final bool isSavedMode;

  const MyPostsScreen({super.key, this.isSavedMode = false});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : const Color(0xFFF8F9FA),

      appBar: AppBar(

        leading: Padding(

          padding: const EdgeInsets.all(8.0),

          child: const CircleAvatar(radius: 12, backgroundImage: NetworkImage('https://i.pravatar.cc/150?u=alex_rivera')),

        ),

        title: Text(isSavedMode ? 'Saved Posts' : 'My Posts', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18, color: Color(0xFF1B4D3E))),

        actions: [

          IconButton(icon: Icon(isSavedMode ? Icons.filter_list : Icons.settings_outlined), onPressed: () {}),

        ],

        backgroundColor: Colors.transparent,

        elevation: 0,

        centerTitle: false,

      ),

      body: SingleChildScrollView(

        padding: const EdgeInsets.all(24),

        child: Column(

          children: [

            if (!isSavedMode) _buildProfileHeader(isDark),

            const SizedBox(height: 24),

            _buildManagementCard(isDark, 'Exploring the new architectural marvels in the...', '2 HOURS AGO', 'https://picsum.photos/seed/arch/200'),

            _buildManagementCard(isDark, 'Why sustainability matters in modern tech development...', 'YESTERDAY', 'https://picsum.photos/seed/tech/200'),

            _buildTextManagementCard(isDark, '"The best way to predict the future is to invent it." — Alan Kay', 'OCT 24, 2023'),

            const SizedBox(height: 100),

          ],

        ),

      ),

      floatingActionButton: isSavedMode ? null : FloatingActionButton(

        onPressed: () {},

        backgroundColor: const Color(0xFF008D58),

        child: const Icon(Icons.add, color: Colors.white, size: 32),

      ),

      bottomNavigationBar: BottomNav(currentIndex: isSavedMode ? 3 : 2), // Adjusting index for demo

    );

  }

  Widget _buildProfileHeader(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(color: isDark ? AppTheme.cardDark : Colors.white, borderRadius: BorderRadius.circular(28)),

      child: Row(

        children: [

          Stack(

            children: [

              const CircleAvatar(radius: 36, backgroundImage: NetworkImage('https://i.pravatar.cc/150?u=alex_rivera')),

              Positioned(bottom: 0, right: 0, child: Container(padding: const EdgeInsets.all(4), decoration: BoxDecoration(color: Color(0xFF00A870), shape: BoxShape.circle), child: const Icon(Icons.check, color: Colors.white, size: 10))),

            ],

          ),

          const SizedBox(width: 20),

          Expanded(

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                const Text('Alex Thompson', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20, letterSpacing: -0.5)),

                const SizedBox(height: 8),

                Row(

                  children: [

                    Container(padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4), decoration: BoxDecoration(color: const Color(0xFFC0FBD8), borderRadius: BorderRadius.circular(8)), child: const Text('CREATOR', style: TextStyle(color: Color(0xFF007A5E), fontSize: 9, fontWeight: FontWeight.w900, letterSpacing: 0.5))),

                    const SizedBox(width: 12),

                    Text('12 posts published', style: TextStyle(color: Colors.grey[400], fontSize: 11, fontWeight: FontWeight.bold)),

                  ],

                ),

              ],

            ),

          ),

        ],

      ),

    );

  }

  Widget _buildManagementCard(bool isDark, String title, String time, String imgUrl) {

    return Container(

      margin: const EdgeInsets.only(bottom: 16),

      padding: const EdgeInsets.all(16),

      decoration: BoxDecoration(color: isDark ? AppTheme.cardDark : Colors.white, borderRadius: BorderRadius.circular(24)),

      child: Row(

        children: [

          ClipRRect(borderRadius: BorderRadius.circular(16), child: Image.network(imgUrl, width: 80, height: 80, fit: BoxFit.cover)),

          const SizedBox(width: 16),

          Expanded(

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                Text(time, style: TextStyle(color: Colors.grey[400], fontSize: 9, fontWeight: FontWeight.bold)),

                const SizedBox(height: 6),

                Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14, height: 1.4), maxLines: 2, overflow: TextOverflow.ellipsis),

                const SizedBox(height: 12),

                Row(

                  mainAxisAlignment: MainAxisAlignment.end,

                  children: [

                    _buildActionButton(Icons.edit, 'Edit', isDark),

                    const SizedBox(width: 12),

                    const Icon(Icons.delete_outline, color: Color(0xFFD32F2F), size: 20),

                  ],

                ),

              ],

            ),

          ),

        ],

      ),

    );

  }

  Widget _buildTextManagementCard(bool isDark, String content, String date) {

    return Container(

      margin: const EdgeInsets.only(bottom: 16),

      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(color: isDark ? AppTheme.cardDark : Colors.white, borderRadius: BorderRadius.circular(24)),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

           Text(date, style: TextStyle(color: Colors.grey[400], fontSize: 9, fontWeight: FontWeight.bold)),

           const SizedBox(height: 12),

           Text(content, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: Color(0xFF007A5E), height: 1.4)),

           const SizedBox(height: 12),

           Text('Deeply inspired by this quote today as we push the new update to the SCU core. Can\'t wait for everyone to see it.', style: TextStyle(color: Colors.grey[600], fontSize: 13, height: 1.5)),

           const SizedBox(height: 20),

           Row(

             mainAxisAlignment: MainAxisAlignment.end,

             children: [

               _buildActionButton(Icons.edit, 'Edit', isDark),

               const SizedBox(width: 12),

               const Icon(Icons.delete_outline, color: Color(0xFFD32F2F), size: 20),

             ],

           ),

        ],

      ),

    );

  }

  Widget _buildActionButton(IconData icon, String label, bool isDark) {

    return Container(

      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),

      decoration: BoxDecoration(color: isDark ? Colors.white10 : const Color(0xFFF1F5F9), borderRadius: BorderRadius.circular(12)),

      child: Row(

        mainAxisSize: MainAxisSize.min,

        children: [

          Icon(icon, size: 14, color: Colors.black54),

          const SizedBox(width: 8),

          Text(label, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.black54)),

        ],

      ),

    );

  }

}
