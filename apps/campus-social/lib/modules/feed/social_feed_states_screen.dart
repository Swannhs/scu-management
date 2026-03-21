
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

enum FeedState { empty, loading, error }

class SocialFeedStatesScreen extends StatefulWidget {

  final FeedState initialState;

  const SocialFeedStatesScreen({super.key, this.initialState = FeedState.empty});

  @override

  State<SocialFeedStatesScreen> createState() => _SocialFeedStatesScreenState();

}

class _SocialFeedStatesScreenState extends State<SocialFeedStatesScreen> with SingleTickerProviderStateMixin {

  late FeedState _currentState;

  late AnimationController _controller;

  @override

  void initState() {

    super.initState();

    _currentState = widget.initialState;

    _controller = AnimationController(vsync: this, duration: const Duration(milliseconds: 1500))..repeat(reverse: true);

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

      backgroundColor: isDark ? AppTheme.backgroundDark : const Color(0xFFF8FAFC),

      appBar: AppBar(

        leading: IconButton(icon: const Icon(Icons.menu), onPressed: () {}),

        title: const Text('Campus Social', style: TextStyle(color: Color(0xFF00A870), fontWeight: FontWeight.bold, fontSize: 18)),

        actions: [

          IconButton(icon: const Icon(Icons.notifications_none), onPressed: () {}),

          const SizedBox(width: 8),

          const CircleAvatar(radius: 12, backgroundImage: NetworkImage('https://i.pravatar.cc/150?u=user')),

          const SizedBox(width: 16),

        ],

        backgroundColor: Colors.transparent,

        elevation: 0,

      ),

      body: _buildBody(isDark),

      bottomNavigationBar: const BottomNav(currentIndex: 0),

    );

  }

  Widget _buildBody(bool isDark) {

    switch (_currentState) {

      case FeedState.empty:

        return _buildEmptyState(isDark);

      case FeedState.loading:

        return _buildLoadingState(isDark);

      case FeedState.error:

        return _buildErrorState(isDark);

    }

  }

  Widget _buildEmptyState(bool isDark) {

    return Padding(

      padding: const EdgeInsets.symmetric(horizontal: 40),

      child: Column(

        mainAxisAlignment: MainAxisAlignment.center,

        children: [

          _buildEmptyIllustration(),

          const SizedBox(height: 48),

          const Text('Your feed is quiet', style: TextStyle(fontSize: 28, fontWeight: FontWeight.w900, fontFamily: 'Public Sans', letterSpacing: -0.5)),

          const SizedBox(height: 16),

          Text(

            'Be the first to share an update, photo, or event with your campus community.',

            textAlign: TextAlign.center,

            style: TextStyle(color: Colors.grey[500], fontSize: 15, height: 1.6),

          ),

          const SizedBox(height: 48),

          ElevatedButton(

            onPressed: () {},

            style: ElevatedButton.styleFrom(

              backgroundColor: const Color(0xFF008D58),

              foregroundColor: Colors.white,

              minimumSize: const Size(double.infinity, 60),

              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),

              elevation: 0,

            ),

            child: Row(

              mainAxisAlignment: MainAxisAlignment.center,

              children: [

                Icon(Icons.add_circle, size: 20),

                SizedBox(width: 12),

                Text('Create First Post', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

              ],

            ),

          ),

          const SizedBox(height: 24),

          TextButton(

            onPressed: () => setState(() => _currentState = FeedState.loading), // For demo

            child: Row(

              mainAxisSize: MainAxisSize.min,

              children: [

                Icon(Icons.search, color: Colors.grey[600], size: 18),

                const SizedBox(width: 8),

                Text('Browse Communities', style: TextStyle(color: Colors.grey[600], fontWeight: FontWeight.bold, fontSize: 14)),

              ],

            ),

          ),

        ],

      ),

    );

  }

  Widget _buildEmptyIllustration() {

    return Stack(

      alignment: Alignment.center,

      children: [

        Container(width: 200, height: 200, decoration: BoxDecoration(color: const Color(0xFFE8F5E9).withOpacity(0.5), shape: BoxShape.circle)),

        Container(width: 140, height: 140, decoration: BoxDecoration(color: Color(0xFFC8E6C9), shape: BoxShape.circle)),

        const Icon(Icons.school, color: Color(0xFF2E7D32), size: 60),

        Positioned(

          bottom: 20,

          right: 20,

          child: Container(padding: const EdgeInsets.all(12), decoration: BoxDecoration(color: Colors.white, shape: BoxShape.circle, boxShadow: [BoxShadow(color: Colors.black12, blurRadius: 10)]), child: const Icon(Icons.chat_bubble_rounded, color: Color(0xFF2E7D32), size: 24)),

        ),

      ],

    );

  }

  Widget _buildLoadingState(bool isDark) {

    return ListView.builder(

      padding: const EdgeInsets.all(24),

      itemCount: 3,

      itemBuilder: (context, index) => _buildSkeletonCard(isDark),

    );

  }

  Widget _buildSkeletonCard(bool isDark) {

    return FadeTransition(

      opacity: _controller,

      child: Container(

        margin: const EdgeInsets.only(bottom: 24),

        padding: const EdgeInsets.all(20),

        decoration: BoxDecoration(color: isDark ? AppTheme.cardDark : Colors.white, borderRadius: BorderRadius.circular(28)),

        child: Column(

          crossAxisAlignment: CrossAxisAlignment.start,

          children: [

            Row(

              children: [

                Container(width: 44, height: 44, decoration: BoxDecoration(color: Colors.grey[200], shape: BoxShape.circle)),

                const SizedBox(width: 12),

                Column(

                  crossAxisAlignment: CrossAxisAlignment.start,

                  children: [

                    Container(width: 120, height: 12, decoration: BoxDecoration(color: Colors.grey[200], borderRadius: BorderRadius.circular(6))),

                    const SizedBox(height: 8),

                    Container(width: 80, height: 8, decoration: BoxDecoration(color: Colors.grey[200], borderRadius: BorderRadius.circular(4))),

                  ],

                ),

              ],

            ),

            const SizedBox(height: 24),

            Container(width: double.infinity, height: 12, decoration: BoxDecoration(color: Colors.grey[200], borderRadius: BorderRadius.circular(6))),

            const SizedBox(height: 12),

            Container(width: 200, height: 12, decoration: BoxDecoration(color: Colors.grey[200], borderRadius: BorderRadius.circular(6))),

            const SizedBox(height: 24),

            Container(width: double.infinity, height: 200, decoration: BoxDecoration(color: Colors.grey[100], borderRadius: BorderRadius.circular(20))),

          ],

        ),

      ),

    );

  }

  Widget _buildErrorState(bool isDark) {

    return Center(

      child: Padding(

        padding: const EdgeInsets.all(40),

        child: Column(

          mainAxisAlignment: MainAxisAlignment.center,

          children: [

            const Icon(Icons.cloud_off_rounded, size: 80, color: Color(0xFFD32F2F)),

            const SizedBox(height: 32),

            const Text('Oops! Connection lost', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold)),

            const SizedBox(height: 16),

            Text(

              'We were unable to load your feed. Check your internet connection and try again.',

              textAlign: TextAlign.center,

              style: TextStyle(color: Colors.grey[500], fontSize: 14, height: 1.5),

            ),

            const SizedBox(height: 32),

            ElevatedButton(

              onPressed: () => setState(() => _currentState = FeedState.empty),

              style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF008D58), foregroundColor: Colors.white, minimumSize: const Size(160, 50), shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)), elevation: 0),

              child: const Text('Retry'),

            ),

          ],

        ),

      ),

    );

  }

}
