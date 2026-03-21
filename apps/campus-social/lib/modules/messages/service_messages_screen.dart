
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class ServiceMessagesScreen extends StatelessWidget {

  const ServiceMessagesScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : const Color(0xFFF8F9FA),

      appBar: AppBar(

        title: const Text('Messages', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20)),

        leading: IconButton(icon: const Icon(Icons.menu), onPressed: () {}),

        actions: [

          IconButton(icon: const Icon(Icons.search), onPressed: () {}),

          Padding(

            padding: const EdgeInsets.only(right: 16.0),

            child: CircleAvatar(

              radius: 18,

              backgroundColor: Colors.orange[100],

              backgroundImage: const NetworkImage('https://i.pravatar.cc/150?u=user'),

            ),

          ),

        ],

        backgroundColor: Colors.transparent,

        elevation: 0,

        foregroundColor: isDark ? Colors.white : Colors.black,

      ),

      body: Column(

        children: [

          Padding(

            padding: const EdgeInsets.all(16.0),

            child: Container(

              padding: const EdgeInsets.symmetric(horizontal: 16),

              decoration: BoxDecoration(

                color: isDark ? AppTheme.cardDark : Colors.grey[200]!.withOpacity(0.5),

                borderRadius: BorderRadius.circular(12),

              ),

              child: const TextField(

                decoration: InputDecoration(

                  icon: Icon(Icons.search, color: Colors.grey, size: 20),

                  hintText: 'Search conversations...',

                  border: InputBorder.none,

                  hintStyle: TextStyle(color: Colors.grey, fontSize: 14),

                ),

              ),

            ),

          ),

          Expanded(

            child: ListView(

              padding: const EdgeInsets.symmetric(horizontal: 16),

              children: [

                _buildMessageCard(

                  'Sarah Jenkins',

                  'CITY PARK RESTORATION',

                  "I've just uploaded the final site ma...",

                  '10:45 AM',

                  'https://i.pravatar.cc/150?u=sarah',

                  unreadCount: 2,

                  isDark: isDark,

                  isHighlighted: true,

                ),

                const SizedBox(height: 12),

                _buildMessageCard(

                  'Coordinator',

                  'GENERAL ADMIN',

                  'Please confirm your attendance fo...',

                  '9:12 AM',

                  null, // Icon instead of image

                  icon: Icons.security,

                  unreadCount: 1,

                  isDark: isDark,

                  isHighlighted: true,

                  avatarBg: Colors.green[100],

                ),

                const SizedBox(height: 12),

                _buildMessageCard(

                  'Marcus Thorne',

                  'TUTORING PROGRAM',

                  'Thanks for the help with the math cu...',

                  'Yesterday',

                  'https://i.pravatar.cc/150?u=marcus',

                  isDark: isDark,

                ),

                const SizedBox(height: 12),

                _buildMessageCard(

                  'Elena Rodriguez',

                  'COMMUNITY KITCHEN',

                  'The inventory count is finished. We n...',

                  'Tuesday',

                  'https://i.pravatar.cc/150?u=elena',

                  isDark: isDark,

                ),

                const SizedBox(height: 12),

                _buildMessageCard(

                  'David Kim',

                  'BEACH CLEAN UP',

                  'I left the equipment in the storage lo...',

                  'Oct 12',

                  'https://i.pravatar.cc/150?u=david',

                  isDark: isDark,

                ),

              ],

            ),

          ),

        ],

      ),

      floatingActionButton: FloatingActionButton(

        onPressed: () {},

        backgroundColor: AppTheme.primary,

        child: const Icon(Icons.edit, color: Colors.white),

      ),

      bottomNavigationBar: const BottomNav(currentIndex: 2), // Chats/Messaging

    );

  }

  Widget _buildMessageCard(

    String name,

    String tag,

    String message,

    String time,

    String? imageUrl, {

    IconData? icon,

    int unreadCount = 0,

    required bool isDark,

    bool isHighlighted = false,

    Color? avatarBg,

  }) {

    return Container(

      padding: const EdgeInsets.all(16),

      decoration: BoxDecoration(

        color: isHighlighted 

            ? (isDark ? AppTheme.cardDark : Colors.white)

            : Colors.transparent,

        borderRadius: BorderRadius.circular(20),

        boxShadow: isHighlighted && !isDark

            ? [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 10, offset: const Offset(0, 4))]

            : null,

      ),

      child: Row(

        children: [

          Stack(

            children: [

              Container(

                width: 56,

                height: 56,

                decoration: BoxDecoration(

                  color: avatarBg ?? Colors.grey[200],

                  borderRadius: BorderRadius.circular(16),

                  image: imageUrl != null 

                    ? DecorationImage(image: NetworkImage(imageUrl), fit: BoxFit.cover)

                    : null,

                ),

                child: imageUrl == null && icon != null

                    ? Icon(icon, color: AppTheme.primary, size: 28)

                    : null,

              ),

              if (unreadCount > 0)

                Positioned(

                  right: -2,

                  top: -2,

                  child: Container(

                    padding: const EdgeInsets.all(4),

                    decoration: BoxDecoration(color: Color(0xFF007A5E), shape: BoxShape.circle),

                    constraints: const BoxConstraints(minWidth: 16, minHeight: 16),

                    child: Text(

                      '$unreadCount',

                      style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold),

                      textAlign: TextAlign.center,

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

                    Text(time, style: TextStyle(color: Colors.grey[500], fontSize: 12)),

                  ],

                ),

                const SizedBox(height: 4),

                Container(

                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),

                  decoration: BoxDecoration(

                    color: AppTheme.primary.withOpacity(0.1),

                    borderRadius: BorderRadius.circular(4),

                  ),

                  child: Text(

                    tag,

                    style: const TextStyle(color: AppTheme.primary, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 0.5),

                  ),

                ),

                const SizedBox(height: 8),

                Text(

                  message,

                  style: TextStyle(color: isDark ? Colors.grey[400] : Colors.grey[600], fontSize: 14),

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

}
