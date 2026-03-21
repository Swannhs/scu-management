
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

class PostDetailScreen extends StatelessWidget {

  const PostDetailScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : const Color(0xFFFBFDFF),

      appBar: AppBar(

        leading: IconButton(icon: const Icon(Icons.arrow_back), onPressed: () => Navigator.pop(context)),

        title: const Text('Post', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18, color: Color(0xFF1B4D3E))),

        backgroundColor: Colors.transparent,

        elevation: 0,

        centerTitle: true,

      ),

      body: Column(

        children: [

          Expanded(

            child: SingleChildScrollView(

              padding: const EdgeInsets.all(24),

              child: Column(

                crossAxisAlignment: CrossAxisAlignment.start,

                children: [

                  _buildPostHeader(),

                  const SizedBox(height: 16),

                  const Text(

                    'Just finished the first prototype for the new robotics club competition! 🤖 Massive thanks to the team for the late night grinds. Let\'s win this! #EngineeringSCU #CampusLiaison #Robotics',

                    style: TextStyle(fontSize: 14, height: 1.6),

                  ),

                  const SizedBox(height: 16),

                  ClipRRect(

                    borderRadius: BorderRadius.circular(20),

                    child: Image.network(r'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800', height: 250, width: double.infinity, fit: BoxFit.cover),

                  ),

                  const SizedBox(height: 20),

                  _buildInteractionStats(),

                  const Divider(height: 48),

                  Row(

                    mainAxisAlignment: MainAxisAlignment.spaceBetween,

                    children: [

                      const Text('Comments', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900, fontFamily: 'Public Sans', letterSpacing: -0.5)),

                      Row(

                        children: [

                          Text('Top Comments', style: TextStyle(color: Colors.grey[500], fontSize: 11, fontWeight: FontWeight.bold)),

                          Icon(Icons.keyboard_arrow_down, color: Colors.grey[500], size: 16),

                        ],

                      ),

                    ],

                  ),

                  const SizedBox(height: 24),

                  _buildComment('Sarah Jenkins', '3h ago', 'That looks incredible! Can\'t wait to see it in action next week. 🔥', 'https://i.pravatar.cc/150?u=sarah_j'),

                  _buildComment('Michael Tran', '20m ago', 'The cooling system looks revamped from the last version. Major improvement!', 'https://i.pravatar.cc/150?u=michael_t'),

                  Padding(

                    padding: const EdgeInsets.only(left: 48, top: 12),

                    child: _buildComment('Alex Rivera', '10m ago', 'Thanks Michael! We had to redo the entire duct to make it fit properly.', 'https://i.pravatar.cc/150?u=alex_rivera', isReply: true),

                  ),

                  const SizedBox(height: 100),

                ],

              ),

            ),

          ),

          _buildCommentInput(isDark),

        ],

      ),

    );

  }

  Widget _buildPostHeader() {

    return Row(

      children: [

        const CircleAvatar(radius: 22, backgroundImage: NetworkImage('https://i.pravatar.cc/150?u=alex_rivera')),

        const SizedBox(width: 12),

        const Expanded(

          child: Column(

            crossAxisAlignment: CrossAxisAlignment.start,

            children: [

              Text('Alex Rivera', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

              Text('Creative Lead • 4h ago', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 10, fontWeight: FontWeight.bold)),

            ],

          ),

        ),

        Container(

          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),

          decoration: BoxDecoration(color: const Color(0xFFC0FBD8), borderRadius: BorderRadius.circular(8)),

          child: const Text('FOLLOW', style: TextStyle(color: Color(0xFF007A5E), fontSize: 10, fontWeight: FontWeight.w900, letterSpacing: 0.5)),

        ),

      ],

    );

  }

  Widget _buildInteractionStats() {

    return Row(

      children: [

        const Icon(Icons.thumb_up, color: Color(0xFF007A5E), size: 18),

        const SizedBox(width: 6),

        const Text('342', style: TextStyle(color: Colors.grey, fontSize: 13, fontWeight: FontWeight.bold)),

        const SizedBox(width: 20),

        const Icon(Icons.chat_bubble, color: Colors.grey, size: 18),

        const SizedBox(width: 6),

        const Text('18', style: TextStyle(color: Colors.grey, fontSize: 13, fontWeight: FontWeight.bold)),

        const Spacer(),

        const Icon(Icons.share_outlined, color: Colors.grey, size: 20),

      ],

    );

  }

  Widget _buildComment(String name, String time, String text, String avatarUrl, {bool isReply = false}) {

    return Container(

      margin: const EdgeInsets.only(bottom: 24),

      child: Row(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          CircleAvatar(radius: 18, backgroundImage: NetworkImage(avatarUrl)),

          const SizedBox(width: 12),

          Expanded(

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                Row(

                  mainAxisAlignment: MainAxisAlignment.spaceBetween,

                  children: [

                    Text(name, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),

                    Text(time, style: TextStyle(color: Colors.grey[400], fontSize: 10, fontWeight: FontWeight.bold)),

                  ],

                ),

                const SizedBox(height: 4),

                Container(

                  padding: const EdgeInsets.all(12),

                  decoration: BoxDecoration(color: isReply ? const Color(0xFFF1F5F9) : Colors.white, borderRadius: BorderRadius.circular(12), border: isReply ? null : Border.all(color: Colors.black.withOpacity(0.05))),

                  child: Text(text, style: const TextStyle(fontSize: 13, height: 1.4)),

                ),

                const SizedBox(height: 8),

                Row(

                  children: [

                    Text('Like', style: TextStyle(color: Colors.grey[400], fontSize: 11, fontWeight: FontWeight.w900)),

                    const SizedBox(width: 16),

                    Text('Reply', style: TextStyle(color: Colors.grey[400], fontSize: 11, fontWeight: FontWeight.w900)),

                  ],

                ),

              ],

            ),

          ),

        ],

      ),

    );

  }

  Widget _buildCommentInput(bool isDark) {

    return Container(

      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),

      decoration: BoxDecoration(color: isDark ? AppTheme.cardDark : Colors.white, border: Border(top: BorderSide(color: Colors.grey[200]!))),

      child: SafeArea(

        child: Row(

          children: [

            const CircleAvatar(radius: 18, backgroundImage: NetworkImage('https://i.pravatar.cc/150?u=user_me')),

            const SizedBox(width: 12),

            Expanded(

              child: Container(

                height: 44,

                padding: const EdgeInsets.symmetric(horizontal: 16),

                decoration: BoxDecoration(color: const Color(0xFFF1F3F5), borderRadius: BorderRadius.circular(22)),

                child: Row(

                  children: [

                    Expanded(child: TextField(decoration: InputDecoration(hintText: 'Write a comment...', hintStyle: TextStyle(color: Colors.grey[400], fontSize: 13), border: InputBorder.none))),

                    Icon(Icons.face_outlined, color: Colors.grey[400], size: 20),

                    const SizedBox(width: 8),

                    Icon(Icons.alternate_email, color: Colors.grey[400], size: 18),

                  ],

                ),

              ),

            ),

            const SizedBox(width: 12),

            Container(padding: const EdgeInsets.all(10), decoration: BoxDecoration(color: Color(0xFF007A5E), shape: BoxShape.circle), child: const Icon(Icons.send_rounded, color: Colors.white, size: 18)),

          ],

        ),

      ),

    );

  }

}
