
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

class SkeletonChatThreadScreen extends StatefulWidget {

  const SkeletonChatThreadScreen({super.key});

  @override

  State<SkeletonChatThreadScreen> createState() => _SkeletonChatThreadScreenState();

}

class _SkeletonChatThreadScreenState extends State<SkeletonChatThreadScreen> with SingleTickerProviderStateMixin {

  late AnimationController _controller;

  late Animation<double> _animation;

  @override

  void initState() {

    super.initState();

    _controller = AnimationController(vsync: this, duration: const Duration(milliseconds: 1500))..repeat(reverse: true);

    _animation = Tween<double>(begin: 0.3, end: 0.8).animate(_controller);

  }

  @override

  void dispose() {

    _controller.dispose();

    super.dispose();

  }

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : Colors.white,

      appBar: AppBar(

        leading: const Icon(Icons.arrow_back, color: Colors.grey),

        title: Row(

          children: [

            _buildSkeletonCircle(32, isDark),

            const SizedBox(width: 12),

            Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                _buildSkeletonLine(100, 12, isDark),

                const SizedBox(height: 4),

                _buildSkeletonLine(60, 8, isDark),

              ],

            ),

          ],

        ),

        actions: const [

          Icon(Icons.videocam_outlined, color: Colors.grey),

          SizedBox(width: 16),

          Icon(Icons.phone_outlined, color: Colors.grey),

          SizedBox(width: 16),

        ],

        backgroundColor: Colors.transparent,

        elevation: 0,

      ),

      body: Column(

        children: [

          Expanded(

            child: ListView(

              padding: const EdgeInsets.all(24),

              children: [

                _buildMessageBubble(false, 200, isDark),

                const SizedBox(height: 16),

                _buildMessageBubble(true, 180, isDark, isGreen: true),

                const SizedBox(height: 16),

                _buildMessageBubble(false, 240, isDark),

                const SizedBox(height: 16),

                _buildMessageBubble(false, 150, isDark, hasAvatar: true),

                const SizedBox(height: 16),

                _buildMessageBubble(true, 220, isDark, isImage: true),

                const SizedBox(height: 16),

                _buildMessageBubble(false, 100, isDark, hasAvatar: true),

              ],

            ),

          ),

          _buildInputBarSkeleton(isDark),

        ],

      ),

    );

  }

  Widget _buildSkeletonLine(double width, double height, bool isDark) {

    return FadeTransition(opacity: _animation,

      child: Container(width: width, height: height, decoration: BoxDecoration(color: isDark ? Colors.white12 : Colors.grey[100], borderRadius: BorderRadius.circular(height/2))),

    );

  }

  Widget _buildSkeletonCircle(double size, bool isDark) {

    return FadeTransition(opacity: _animation,

      child: Container(width: size, height: size, decoration: BoxDecoration(color: isDark ? Colors.white12 : Colors.grey[100], shape: BoxShape.circle)),

    );

  }

  Widget _buildMessageBubble(bool isMe, double width, bool isDark, {bool isGreen = false, bool hasAvatar = false, bool isImage = false}) {

    return Align(

      alignment: isMe ? Alignment.centerRight : Alignment.centerLeft,

      child: Row(

        mainAxisSize: MainAxisSize.min,

        crossAxisAlignment: CrossAxisAlignment.end,

        children: [

          if (!isMe && hasAvatar) ...[_buildSkeletonCircle(32, isDark), const SizedBox(width: 8)],

          if (!isMe && !hasAvatar) const SizedBox(width: 40),

          FadeTransition(

            opacity: _animation,

            child: Container(

              width: width,

              height: isImage ? 180 : 50,

              decoration: BoxDecoration(

                color: isGreen ? const Color(0xFFC0FBD8).withOpacity(0.5) : (isDark ? AppTheme.cardDark : const Color(0xFFF1F3F5)),

                borderRadius: BorderRadius.only(

                  topLeft: const Radius.circular(16),

                  topRight: const Radius.circular(16),

                  bottomLeft: isMe ? const Radius.circular(16) : const Radius.circular(4),

                  bottomRight: isMe ? const Radius.circular(4) : const Radius.circular(16),

                ),

              ),

            ),

          ),

        ],

      ),

    );

  }

  Widget _buildInputBarSkeleton(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(16),

      child: Row(

        children: [

          _buildSkeletonCircle(32, isDark),

          const SizedBox(width: 12),

          Expanded(child: FadeTransition(opacity: _animation, child: Container(height: 48, decoration: BoxDecoration(color: isDark ? AppTheme.cardDark : const Color(0xFFF1F3F5), borderRadius: BorderRadius.circular(24))))),

          const SizedBox(width: 12),

          FadeTransition(opacity: _animation, child: Container(width: 48, height: 48, decoration: BoxDecoration(color: Color(0xFF00A870), shape: BoxShape.circle), child: const Icon(Icons.mic, color: Colors.white))),

        ],

      ),

    );

  }

}
