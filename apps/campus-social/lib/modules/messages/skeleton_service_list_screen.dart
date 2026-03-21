
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class SkeletonServiceListScreen extends StatefulWidget {

  const SkeletonServiceListScreen({super.key});

  @override

  State<SkeletonServiceListScreen> createState() => _SkeletonServiceListScreenState();

}

class _SkeletonServiceListScreenState extends State<SkeletonServiceListScreen> with SingleTickerProviderStateMixin {

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

            child: _buildSkeletonCircle(24, isDark),

          ),

        ],

      ),

      body: SingleChildScrollView(

        child: Padding(

          padding: const EdgeInsets.all(24.0),

          child: Column(

            children: [

              _buildSkeletonRect(double.infinity, 56, 12, isDark), // Search bar

              const SizedBox(height: 24),

              _buildSkeletonPills(isDark), // Filter pills

              const SizedBox(height: 32),

              Column(

                children: List.generate(3, (index) => _buildSkeletonCard(isDark)),

              ),

              const SizedBox(height: 100),

            ],

          ),

        ),

      ),

      bottomNavigationBar: const BottomNav(currentIndex: 1), // Explore/Service List index

    );

  }

  Widget _buildSkeletonLine(double width, double height, bool isDark) {

    return FadeTransition(opacity: _animation,

      child: Container(width: width, height: height, decoration: BoxDecoration(color: isDark ? Colors.white12 : Colors.grey[200], borderRadius: BorderRadius.circular(height/2))),

    );

  }

  Widget _buildSkeletonCircle(double size, bool isDark) {

    return FadeTransition(opacity: _animation,

      child: Container(width: size, height: size, decoration: BoxDecoration(color: isDark ? Colors.white12 : Colors.grey[200], shape: BoxShape.circle)),

    );

  }

  Widget _buildSkeletonRect(double width, double height, double radius, bool isDark) {

    return FadeTransition(opacity: _animation,

      child: Container(width: width, height: height, decoration: BoxDecoration(color: isDark ? AppTheme.cardDark : Colors.white, borderRadius: BorderRadius.circular(radius), boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 10)])),

    );

  }

  Widget _buildSkeletonPills(bool isDark) {

    return SingleChildScrollView(

      scrollDirection: Axis.horizontal,

      child: Row(

        children: List.generate(5, (index) => Padding(

          padding: const EdgeInsets.only(right: 12.0),

          child: FadeTransition(opacity: _animation,

            child: Container(width: 80, height: 32, decoration: BoxDecoration(color: index == 0 ? (isDark ? Colors.white24 : Colors.grey[300]) : (isDark ? Colors.white10 : Colors.grey[100]), borderRadius: BorderRadius.circular(16))),

          ),

        )),

      ),

    );

  }

  Widget _buildSkeletonCard(bool isDark) {

    return Container(

      margin: const EdgeInsets.only(bottom: 24),

      padding: const EdgeInsets.all(16),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(24),

        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 10)],

      ),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          _buildSkeletonRect(double.infinity, 160, 16, isDark),

          const SizedBox(height: 16),

          _buildSkeletonLine(200, 16, isDark),

          const SizedBox(height: 12),

          Row(

            children: [

              _buildSkeletonLine(80, 10, isDark),

              const Spacer(),

              _buildSkeletonCircle(24, isDark),

            ],

          ),

          const SizedBox(height: 16),

          Row(

            children: [

              _buildSkeletonCircle(24, isDark),

              const SizedBox(width: 8),

              _buildSkeletonLine(100, 10, isDark),

              const Spacer(),

              _buildSkeletonRect(80, 32, 16, isDark),

            ],

          ),

        ],

      ),

    );

  }

}
