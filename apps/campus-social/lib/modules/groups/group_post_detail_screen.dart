
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

class GroupPostDetailScreen extends StatelessWidget {

  const GroupPostDetailScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : Colors.white,

      appBar: AppBar(

        backgroundColor: Colors.transparent,

        elevation: 0,

        leading: IconButton(

          icon: const Icon(Icons.arrow_back),

          onPressed: () => Navigator.pop(context),

        ),

        title: Column(

          crossAxisAlignment: CrossAxisAlignment.start,

          children: [

            const Text('Robotics Club', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

            Text('1.2k members • 24 online', style: TextStyle(color: AppTheme.primary, fontSize: 11, fontWeight: FontWeight.bold)),

          ],

        ),

        actions: [

          IconButton(onPressed: () {}, icon: const Icon(Icons.more_horiz)),

        ],

      ),

      body: Stack(

        children: [

          SingleChildScrollView(

            padding: const EdgeInsets.all(16),

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                _buildAuthorRow(isDark),

                const SizedBox(height: 16),

                _buildPostContent(isDark),

                const SizedBox(height: 16),

                _buildPostImage(),

                const SizedBox(height: 16),

                _buildReactionSummary(isDark),

                const Divider(height: 1),

                _buildActionButtons(isDark),

                const SizedBox(height: 8),

                _buildCommentsSection(isDark),

                const SizedBox(height: 120), // Height for fixed bottom bar

              ],

            ),

          ),

          _buildBottomCommentBar(context, isDark),

        ],

      ),

    );

  }

  Widget _buildAuthorRow(bool isDark) {

    return Row(

      children: [

        const CircleAvatar(radius: 24, backgroundImage: NetworkImage('https://i.pravatar.cc/100')),

        const SizedBox(width: 12),

        Column(

          crossAxisAlignment: CrossAxisAlignment.start,

          children: [

            Row(

              children: const [

                Text('Alex Rivers', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

                SizedBox(width: 4),

                Icon(Icons.verified, color: AppTheme.primary, size: 16),

              ],

            ),

            Text('President • 2 hours ago', style: TextStyle(color: Colors.grey[500], fontSize: 13)),

          ],

        ),

      ],

    );

  }

  Widget _buildPostContent(bool isDark) {

    return Column(

      crossAxisAlignment: CrossAxisAlignment.start,

      children: [

        Text(

          'Check out our latest Mars Rover prototype! 🚀 We finally got the independent suspension system working perfectly for uneven terrain. The chassis is now 15% lighter thanks to the new carbon fiber mounts.\n\nTesting it out on the campus quad this Friday. Join us at 4 PM for a live demo and to learn how you can join the programming team!',

          style: TextStyle(fontSize: 15, color: isDark ? Colors.grey[300] : Color(0xFF1E293B), height: 1.5),

        ),

        const SizedBox(height: 8),

        const Text(

          '#MarsRover #RoboticsClub #CampusInnovation',

          style: TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold, fontSize: 14),

        ),

      ],

    );

  }

  Widget _buildPostImage() {

    return ClipRRect(

      borderRadius: BorderRadius.circular(16),

      child: Image.network(

        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',

        width: double.infinity,

        fit: BoxFit.cover,

      ),

    );

  }

  Widget _buildReactionSummary(bool isDark) {

    return Padding(

      padding: const EdgeInsets.symmetric(vertical: 12),

      child: Row(

        mainAxisAlignment: MainAxisAlignment.spaceBetween,

        children: [

          Row(

            children: [

              _ReactionIcon(Icons.thumb_up, Colors.blue),

              Transform.translate(offset: const Offset(-4, 0), child: _ReactionIcon(Icons.favorite, Colors.red)),

              Transform.translate(offset: const Offset(-8, 0), child: _ReactionIcon(Icons.rocket_launch, AppTheme.primary)),

              const SizedBox(width: 4),

              Text('124 others', style: TextStyle(color: Colors.grey[500], fontSize: 12, fontWeight: FontWeight.bold)),

            ],

          ),

          Text('12 comments • 5 shares', style: TextStyle(color: Colors.grey[500], fontSize: 12)),

        ],

      ),

    );

  }

  Widget _buildActionButtons(bool isDark) {

    return Row(

      mainAxisAlignment: MainAxisAlignment.spaceAround,

      children: [

        _ActionButton(Icons.thumb_up_alt_outlined, 'Like', AppTheme.primary, true),

        _ActionButton(Icons.chat_bubble_outline, 'Comment', Colors.grey, false),

        _ActionButton(Icons.share_outlined, 'Share', Colors.grey, false),

      ],

    );

  }

  Widget _buildCommentsSection(bool isDark) {

    return Column(

      crossAxisAlignment: CrossAxisAlignment.start,

      children: [

        const SizedBox(height: 16),

        Row(

          mainAxisAlignment: MainAxisAlignment.spaceBetween,

          children: [

            const Text('Comments', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

            Row(children: const [Text('Newest', style: TextStyle(fontSize: 12)), Icon(Icons.expand_more, size: 16)]),

          ],

        ),

        const SizedBox(height: 16),

        _buildCommentItem('Sarah Jenkins', 'That suspension looks incredible! Are you guys using a triple-bogey system or something custom designed?', '45m ago', isDark),

        _buildCommentItem('Alex Rivers', 'Custom designed! We took inspiration from the Perseverance rover but adapted it for smaller scale obstacles.', '22m ago', isDark, isAuthor: true, isReply: true),

        _buildCommentItem('Leo Zhang', 'I\'ll be there! Can\'t wait to see the navigation logic in action.', '10m ago', isDark),

      ],

    );

  }

  Widget _buildCommentItem(String user, String text, String time, bool isDark, {bool isAuthor = false, bool isReply = false}) {

    return Padding(

      padding: EdgeInsets.only(left: isReply ? 40 : 0, bottom: 20),

      child: Row(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          CircleAvatar(radius: isReply ? 16 : 20, backgroundImage: const NetworkImage('https://i.pravatar.cc/100')),

          const SizedBox(width: 12),

          Expanded(

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                Container(

                  padding: const EdgeInsets.all(12),

                  decoration: BoxDecoration(

                    color: isDark ? Color(0xFF1E293B) : const Color(0xFFF2F4F6),

                    borderRadius: BorderRadius.circular(16),

                  ),

                  child: Column(

                    crossAxisAlignment: CrossAxisAlignment.start,

                    children: [

                      Row(

                        children: [

                          Text(user, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),

                          if (isAuthor) const SizedBox(width: 6),

                          if (isAuthor) Container(padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2), decoration: BoxDecoration(color: AppTheme.primary.withOpacity(0.1), borderRadius: BorderRadius.circular(4)), child: const Text('AUTHOR', style: TextStyle(color: AppTheme.primary, fontSize: 8, fontWeight: FontWeight.bold))),

                        ],

                      ),

                      const SizedBox(height: 4),

                      Text(text, style: const TextStyle(fontSize: 13, height: 1.4)),

                    ],

                  ),

                ),

                const SizedBox(height: 4),

                Row(

                  children: [

                    const Text('Like', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 11, color: Colors.grey)),

                    const SizedBox(width: 16),

                    const Text('Reply', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 11, color: Colors.grey)),

                    const SizedBox(width: 16),

                    Text(time.toUpperCase(), style: TextStyle(fontSize: 9, color: Colors.grey[400])),

                  ],

                ),

              ],

            ),

          ),

        ],

      ),

    );

  }

  Widget _buildBottomCommentBar(BuildContext context, bool isDark) {

    return Positioned(

      bottom: 0,

      left: 0,

      right: 0,

      child: Container(

        padding: const EdgeInsets.fromLTRB(16, 12, 16, 32),

        decoration: BoxDecoration(

          color: isDark ? AppTheme.backgroundDark : Colors.white,

          border: Border(top: BorderSide(color: Colors.grey.withOpacity(0.1))),

        ),

        child: Row(

          children: [

            Expanded(

              child: Container(

                height: 48,

                decoration: BoxDecoration(

                  color: isDark ? Color(0xFF1E293B) : const Color(0xFFF2F4F6),

                  borderRadius: BorderRadius.circular(24),

                ),

                child: const TextField(

                  decoration: InputDecoration(

                    hintText: 'Write a comment...',

                    border: InputBorder.none,

                    contentPadding: EdgeInsets.symmetric(horizontal: 20),

                  ),

                ),

              ),

            ),

            const SizedBox(width: 12),

            Container(

              width: 48,

              height: 48,

              decoration: BoxDecoration(color: AppTheme.primary, shape: BoxShape.circle),

              child: const Icon(Icons.send, color: Colors.white, size: 20),

            ),

          ],

        ),

      ),

    );

  }

}

class _ReactionIcon extends StatelessWidget {

  final IconData icon;

  final Color color;

  const _ReactionIcon(this.icon, this.color);

  @override

  Widget build(BuildContext context) {

    return Container(

      width: 20,

      height: 20,

      decoration: BoxDecoration(color: color, shape: BoxShape.circle, border: Border.all(color: Colors.white, width: 1)),

      child: Icon(icon, color: Colors.white, size: 10),

    );

  }

}

class _ActionButton extends StatelessWidget {

  final IconData icon;

  final String label;

  final Color color;

  final bool isActive;

  const _ActionButton(this.icon, this.label, this.color, this.isActive);

  @override

  Widget build(BuildContext context) {

    return TextButton.icon(

      onPressed: () {},

      icon: Icon(icon, color: color, size: 20),

      label: Text(label, style: TextStyle(color: color, fontWeight: isActive ? FontWeight.bold : FontWeight.w500, fontSize: 13)),

    );

  }

}
