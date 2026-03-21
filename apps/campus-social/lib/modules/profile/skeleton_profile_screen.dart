
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class SkeletonProfileScreen extends StatefulWidget {

  const SkeletonProfileScreen({super.key});

  @override

  State<SkeletonProfileScreen> createState() => _SkeletonProfileScreenState();

}

class _SkeletonProfileScreenState extends State<SkeletonProfileScreen> with SingleTickerProviderStateMixin {

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

      backgroundColor: isDark ? AppTheme.backgroundDark : const Color(0xFFF8F9FA),

      appBar: AppBar(

        title: _buildSkeletonLine(100, 16, isDark),

        backgroundColor: Colors.transparent,

        elevation: 0,

        actions: [

          Padding(

            padding: const EdgeInsets.only(right: 16.0),

            child: _buildSkeletonCircle(32, isDark),

          ),

        ],

      ),

      body: SingleChildScrollView(

        child: Column(

          children: [

            const SizedBox(height: 32),

            _buildSkeletonCircle(120, isDark),

            const SizedBox(height: 24),

            _buildSkeletonLine(180, 24, isDark),

            const SizedBox(height: 12),

            _buildSkeletonLine(120, 14, isDark),

            const SizedBox(height: 48),

            _buildStatSkeletonRow(isDark),

            const SizedBox(height: 48),

            _buildMenuSkeletonList(isDark),

            const SizedBox(height: 100),

          ],

        ),

      ),

      bottomNavigationBar: const BottomNav(currentIndex: 4), // Profile index

    );

  }

  Widget _buildSkeletonLine(double width, double height, bool isDark) {

    return FadeTransition(

      opacity: _animation,

      child: Container(

        width: width,

        height: height,

        decoration: BoxDecoration(

          color: isDark ? Colors.white12 : Colors.grey[200],

          borderRadius: BorderRadius.circular(height / 2),

        ),

      ),

    );

  }

  Widget _buildSkeletonCircle(double size, bool isDark) {

    return FadeTransition(

      opacity: _animation,

      child: Container(

        width: size,

        height: size,

        decoration: BoxDecoration(

          color: isDark ? Colors.white12 : Colors.grey[200],

          shape: BoxShape.circle,

        ),

      ),

    );

  }

  Widget _buildStatSkeletonRow(bool isDark) {

    return Padding(

      padding: const EdgeInsets.symmetric(horizontal: 24.0),

      child: Row(

        mainAxisAlignment: MainAxisAlignment.spaceBetween,

        children: List.generate(3, (index) => FadeTransition(

          opacity: _animation,

          child: Container(

            width: 100,

            height: 100,

            decoration: BoxDecoration(

              color: isDark ? AppTheme.cardDark : Colors.white,

              borderRadius: BorderRadius.circular(20),

              boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 10)],

            ),

            child: Center(

              child: Container(

                width: 60,

                height: 40,

                decoration: BoxDecoration(

                  color: isDark ? Colors.white10 : Colors.grey[100],

                  borderRadius: BorderRadius.circular(10),

                ),

              ),

            ),

          ),

        )),

      ),

    );

  }

  Widget _buildMenuSkeletonList(bool isDark) {

    return Padding(

      padding: const EdgeInsets.symmetric(horizontal: 24.0),

      child: Column(

        children: List.generate(4, (index) => Padding(

          padding: const EdgeInsets.only(bottom: 16.0),

          child: FadeTransition(

            opacity: _animation,

            child: Container(

              height: 72,

              decoration: BoxDecoration(

                color: isDark ? AppTheme.cardDark : Colors.white,

                borderRadius: BorderRadius.circular(16),

              ),

            ),

          ),

        )),

      ),

    );

  }

}
