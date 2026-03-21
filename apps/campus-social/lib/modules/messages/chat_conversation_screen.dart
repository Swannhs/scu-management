
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

class ChatConversationScreen extends StatelessWidget {

  const ChatConversationScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : const Color(0xFFF8F9FA),

      appBar: AppBar(

        title: Column(

          crossAxisAlignment: CrossAxisAlignment.start,

          children: [

            const Text('Coordinator Sarah', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

            Container(

              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),

              decoration: BoxDecoration(color: const Color(0xFFC0F2D8), borderRadius: BorderRadius.circular(4)),

              child: const Text('Project: City Park Restoration', style: TextStyle(color: Color(0xFF007A5E), fontSize: 9, fontWeight: FontWeight.bold)),

            ),

          ],

        ),

        leading: IconButton(icon: const Icon(Icons.arrow_back), onPressed: () => Navigator.pop(context)),

        actions: [

          IconButton(icon: const Icon(Icons.more_vert), onPressed: () {}),

        ],

        backgroundColor: Colors.transparent,

        elevation: 0,

        foregroundColor: isDark ? Colors.white : Colors.black,

      ),

      body: Column(

        children: [

          Expanded(

            child: ListView(

              padding: const EdgeInsets.all(20),

              children: [

                Center(

                  child: Container(

                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),

                    decoration: BoxDecoration(color: Colors.grey[200], borderRadius: BorderRadius.circular(16)),

                    child: Text('TODAY', style: TextStyle(color: Colors.grey[600], fontSize: 11, fontWeight: FontWeight.bold)),

                  ),

                ),

                const SizedBox(height: 32),

                _buildMessageBubble(

                  context,

                  'Hello! I\'ve just updated the site visit schedule for the City Park Restoration. Could you please review the new times?',

                  '09:41 AM',

                  false,

                  isDark,

                ),

                const SizedBox(height: 24),

                _buildMessageBubble(

                  context,

                  'Sure thing, Coordinator Sarah! I\'ll check it right away. Are the tools already on-site?',

                  '09:45 AM',

                  true,

                  isDark,

                ),

                const SizedBox(height: 24),

                _buildImageMessage(

                  'Yes, everything is ready. Here\'s a photo of the main entrance area we\'ll be starting with.',

                  '09:47 AM',

                  'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',

                  isDark,

                ),

                const SizedBox(height: 24),

                _buildMessageBubble(

                  context,

                  'The site looks great! The progress is really visible now.',

                  '09:50 AM',

                  true,

                  isDark,

                ),

              ],

            ),

          ),

          _buildMessageInput(isDark),

        ],

      ),

    );

  }

  Widget _buildMessageBubble(BuildContext context, String text, String time, bool isMe, bool isDark) {

    return Column(

      crossAxisAlignment: isMe ? CrossAxisAlignment.end : CrossAxisAlignment.start,

      children: [

        Container(

          constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.75),

          padding: const EdgeInsets.all(16),

          decoration: BoxDecoration(

            color: isMe ? const Color(0xFF006D44) : (isDark ? AppTheme.cardDark : Colors.grey[200]!.withOpacity(0.8)),

            borderRadius: BorderRadius.only(

              topLeft: const Radius.circular(20),

              topRight: const Radius.circular(20),

              bottomLeft: Radius.circular(isMe ? 20 : 0),

              bottomRight: Radius.circular(isMe ? 0 : 20),

            ),

          ),

          child: Text(

            text,

            style: TextStyle(

              color: isMe ? Colors.white : (isDark ? Colors.white : Colors.black87),

              fontSize: 14,

              height: 1.4,

            ),

          ),

        ),

        const SizedBox(height: 4),

        Row(

          mainAxisSize: MainAxisSize.min,

          mainAxisAlignment: isMe ? MainAxisAlignment.end : MainAxisAlignment.start,

          children: [

            Text(time, style: TextStyle(color: Colors.grey[500], fontSize: 10)),

            if (isMe) ...[

              const SizedBox(width: 4),

              const Icon(Icons.done_all, color: AppTheme.primary, size: 14),

            ],

          ],

        ),

      ],

    );

  }

  Widget _buildImageMessage(String text, String time, String imageUrl, bool isDark) {

    return Column(

      crossAxisAlignment: CrossAxisAlignment.start,

      children: [

        Container(

          width: 280,

          decoration: BoxDecoration(

            color: isDark ? AppTheme.cardDark : Colors.grey[200]!.withOpacity(0.8),

            borderRadius: BorderRadius.circular(20),

          ),

          child: Column(

            children: [

              ClipRRect(

                borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),

                child: Image.network(imageUrl, height: 180, width: double.infinity, fit: BoxFit.cover),

              ),

              Padding(

                padding: const EdgeInsets.all(16),

                child: Text(text, style: const TextStyle(fontSize: 14, height: 1.4)),

              ),

            ],

          ),

        ),

        const SizedBox(height: 4),

        Text(time, style: TextStyle(color: Colors.grey[500], fontSize: 10)),

      ],

    );

  }

  Widget _buildMessageInput(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(20),

      color: Colors.transparent,

      child: Container(

        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),

        decoration: BoxDecoration(

          color: isDark ? AppTheme.cardDark : Colors.white,

          borderRadius: BorderRadius.circular(32),

          boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 10, offset: const Offset(0, 4))],

        ),

        child: Row(

          children: [

            IconButton(icon: const Icon(Icons.add, color: Colors.grey), onPressed: () {}),

            const Expanded(

              child: TextField(

                decoration: InputDecoration(

                  hintText: 'Type a message...',

                  border: InputBorder.none,

                  hintStyle: TextStyle(color: Colors.grey, fontSize: 14),

                ),

              ),

            ),

            Container(

              decoration: BoxDecoration(color: Color(0xFF006D44), shape: BoxShape.circle),

              child: IconButton(icon: const Icon(Icons.send, color: Colors.white, size: 20), onPressed: () {}),

            ),

          ],

        ),

      ),

    );

  }

}
