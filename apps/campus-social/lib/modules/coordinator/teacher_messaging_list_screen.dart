
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

class TeacherMessagingListScreen extends StatelessWidget {

  const TeacherMessagingListScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : const Color(0xFFF8F9FA),

      appBar: AppBar(

        title: const Text('Service Messages', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),

        leading: IconButton(icon: const Icon(Icons.menu), onPressed: () {}),

        actions: [

          IconButton(icon: const Icon(Icons.search), onPressed: () {}),

        ],

        backgroundColor: Colors.transparent,

        elevation: 0,

        foregroundColor: isDark ? Colors.white : Colors.black,

      ),

      body: Column(

        children: [

          _buildMessageList(isDark),

          const SizedBox(height: 48),

          _buildFooter(isDark),

          const SizedBox(height: 100),

        ],

      ),

      bottomNavigationBar: _buildMessagingBottomNav(isDark),

    );

  }

  Widget _buildMessageList(bool isDark) {

    return Column(

      children: [

        _buildChatItem(

          'Alex Johnson',

          'CITY PARK RESTORATION',

          'I\'ve completed the initial survey of the...',

          '2 min ago',

          'https://i.pravatar.cc/150?u=alex_j_v4',

          badgeText: 'ACTION NEEDED',

          badgeColor: const Color(0xFFFFE3E3),

          badgeTextColor: const Color(0xFFD32F2F),

          isDark: isDark,

          isOnline: true,

        ),

        _buildChatItem(

          'Sarah Chen',

          'ELDERLY CARE INITIATIVE',

          'The weekend schedule has been...',

          '1 hour ago',

          'https://i.pravatar.cc/150?u=sarah_c',

          badgeText: 'NEW MESSAGE',

          badgeColor: const Color(0xFF007D53),

          badgeTextColor: Colors.white,

          isDark: isDark,

          isOnline: true,

        ),

        _buildChatItem(

          'Marcus Wright',

          'COMMUNITY LITERACY',

          'Thanks for the feedback on my session...',

          'Yesterday',

          'https://i.pravatar.cc/150?u=marcus_w_v2',

          isDark: isDark,

        ),

        _buildChatItem(

          'Elena Rodriguez',

          'URBAN FARMING PROJECT',

          'Can we discuss the irrigation logistics...',

          '2 days ago',

          'https://i.pravatar.cc/150?u=elena_r_v2',

          isDark: isDark,

        ),

      ],

    );

  }

  Widget _buildChatItem(

    String name,

    String project,

    String snippet,

    String time,

    String imageUrl, {

    String? badgeText,

    Color? badgeColor,

    Color? badgeTextColor,

    required bool isDark,

    bool isOnline = false,

  }) {

    return Container(

      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),

      color: Colors.transparent,

      child: Row(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          Stack(

            children: [

              CircleAvatar(radius: 28, backgroundImage: NetworkImage(imageUrl)),

              if (isOnline)

                Positioned(

                  right: 2,

                  bottom: 2,

                  child: Container(

                    width: 14,

                    height: 14,

                    decoration: BoxDecoration(

                      color: const Color(0xFF008D58),

                      shape: BoxShape.circle,

                      border: Border.all(color: isDark ? AppTheme.backgroundDark : Colors.white, width: 2),

                    ),

                  ),

                ),

            ],

          ),

          const SizedBox(width: 16),

          Expanded(

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                Row(

                  mainAxisAlignment: MainAxisAlignment.spaceBetween,

                  children: [

                    Text(name, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

                    Text(time, style: TextStyle(color: Colors.grey[500], fontSize: 11, fontWeight: FontWeight.bold)),

                  ],

                ),

                const SizedBox(height: 6),

                Row(

                  children: [

                    Container(

                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),

                      decoration: BoxDecoration(color: const Color(0xFFE9FAEF), borderRadius: BorderRadius.circular(6)),

                      child: Text(project, style: const TextStyle(color: Color(0xFF007A5E), fontSize: 9, fontWeight: FontWeight.bold, letterSpacing: 0.5)),

                    ),

                    if (badgeText != null) ...[

                      const SizedBox(width: 8),

                      Container(

                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),

                        decoration: BoxDecoration(color: badgeColor, borderRadius: BorderRadius.circular(6)),

                        child: Text(badgeText, style: TextStyle(color: badgeTextColor, fontSize: 9, fontWeight: FontWeight.bold, letterSpacing: 0.5)),

                      ),

                    ],

                  ],

                ),

                const SizedBox(height: 12),

                Text(

                  snippet,

                  style: TextStyle(color: Colors.grey[600], fontSize: 13, height: 1.3),

                  maxLines: 1,

                  overflow: TextOverflow.ellipsis,

                ),

              ],

            ),

          ),

        ],

      ),

    );

  }

  Widget _buildFooter(bool isDark) {

    return Column(

      children: [

        Container(

          padding: const EdgeInsets.all(24),

          decoration: BoxDecoration(color: Colors.grey[100], borderRadius: BorderRadius.circular(20)),

          child: const Icon(Icons.forum_outlined, color: Colors.grey, size: 40),

        ),

        const SizedBox(height: 20),

        const Text('End of conversations', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),

        const SizedBox(height: 8),

        Text(

          'All your active student\ninteractions are listed above.',

          textAlign: TextAlign.center,

          style: TextStyle(color: Colors.grey[500], fontSize: 13, height: 1.5),

        ),

      ],

    );

  }

  Widget _buildMessagingBottomNav(bool isDark) {

    return Container(

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        border: Border(top: BorderSide(color: Colors.grey[200]!)),

      ),

      padding: const EdgeInsets.symmetric(vertical: 12),

      child: Row(

        mainAxisAlignment: MainAxisAlignment.spaceAround,

        children: [

          _buildNavItem(Icons.home_outlined, 'Home', false),

          _buildNavItem(Icons.volunteer_activism_outlined, 'Projects', false),

          _buildNavItem(Icons.forum, 'Messages', true),

          _buildNavItem(Icons.person_outline, 'Profile', false),

        ],

      ),

    );

  }

}

class _buildNavItem extends StatelessWidget {

  final IconData icon;

  final String label;

  final bool isSelected;

  const _buildNavItem(this.icon, this.label, this.isSelected);

  @override

  Widget build(BuildContext context) {

    return Column(

      mainAxisSize: MainAxisSize.min,

      children: [

        Icon(icon, color: isSelected ? const Color(0xFF008D58) : Colors.grey[400], size: 24),

        const SizedBox(height: 4),

        Text(label, style: TextStyle(color: isSelected ? const Color(0xFF008D58) : Colors.grey[600], fontSize: 10, fontWeight: isSelected ? FontWeight.bold : FontWeight.normal)),

      ],

    );

  }

}
