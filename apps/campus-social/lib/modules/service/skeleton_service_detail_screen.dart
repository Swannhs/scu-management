
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

class SkeletonServiceDetailScreen extends StatefulWidget {

  const SkeletonServiceDetailScreen({super.key});

  @override

  State<SkeletonServiceDetailScreen> createState() => _SkeletonServiceDetailScreenState();

}

class _SkeletonServiceDetailScreenState extends State<SkeletonServiceDetailScreen> with SingleTickerProviderStateMixin {

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

      body: Stack(

        children: [

          SingleChildScrollView(

            child: Column(

              children: [

                _buildSkeletonRect(double.infinity, 300, 0, isDark),

                Transform.translate(

                  offset: const Offset(0, -30),

                  child: Container(

                    width: double.infinity,

                    decoration: BoxDecoration(

                      color: isDark ? AppTheme.backgroundDark : const Color(0xFFF8F9FA),

                      borderRadius: const BorderRadius.vertical(top: Radius.circular(30)),

                    ),

                    padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 32),

                    child: Column(

                      crossAxisAlignment: CrossAxisAlignment.start,

                      children: [

                        _buildSkeletonLine(80, 16, isDark, isColor: true),

                        const SizedBox(height: 16),

                        _buildSkeletonLine(250, 24, isDark),

                        const SizedBox(height: 12),

                        _buildSkeletonLine(180, 16, isDark),

                        const SizedBox(height: 40),

                        _buildStatIconsSkeleton(isDark),

                        const SizedBox(height: 48),

                        _buildSkeletonLine(100, 14, isDark),

                        const SizedBox(height: 16),

                        _buildMultiLines(5, isDark),

                        const SizedBox(height: 40),

                        Row(

                          children: [

                            Expanded(child: _buildMultiLines(3, isDark)),

                            const SizedBox(width: 24),

                            _buildSkeletonRect(100, 100, 16, isDark),

                          ],

                        ),

                        const SizedBox(height: 40),

                        _buildSkeletonLine(120, 14, isDark),

                        const SizedBox(height: 16),

                        _buildMultiLines(2, isDark),

                        const SizedBox(height: 120),

                      ],

                    ),

                  ),

                ),

              ],

            ),

          ),

          _buildStickyBottomActions(isDark),

        ],

      ),

    );

  }

  Widget _buildSkeletonLine(double width, double height, bool isDark, {bool isColor = false}) {

    return FadeTransition(opacity: _animation,

      child: Container(width: width, height: height, decoration: BoxDecoration(color: isColor ? const Color(0xFFC0FBD8).withOpacity(0.5) : (isDark ? Colors.white12 : Colors.grey[200]), borderRadius: BorderRadius.circular(height/2))),

    );

  }

  Widget _buildSkeletonRect(double width, double height, double radius, bool isDark) {

    return FadeTransition(opacity: _animation,

      child: Container(width: width, height: height, decoration: BoxDecoration(color: isDark ? AppTheme.cardDark : Colors.white, borderRadius: BorderRadius.circular(radius))),

    );

  }

  Widget _buildStatIconsSkeleton(bool isDark) {

    return Row(

      mainAxisAlignment: MainAxisAlignment.spaceAround,

      children: List.generate(3, (index) => Column(

        children: [

          _buildSkeletonCircle(48, isDark),

          const SizedBox(height: 12),

          _buildSkeletonLine(60, 10, isDark),

        ],

      )),

    );

  }

  Widget _buildSkeletonCircle(double size, bool isDark) {

    return FadeTransition(opacity: _animation,

      child: Container(width: size, height: size, decoration: BoxDecoration(color: isDark ? Colors.white12 : Colors.grey[200], shape: BoxShape.circle)),

    );

  }

  Widget _buildMultiLines(int lines, bool isDark) {

    return Column(

      crossAxisAlignment: CrossAxisAlignment.start,

      children: List.generate(lines, (index) => Padding(

        padding: const EdgeInsets.only(bottom: 12.0),

        child: _buildSkeletonLine(index == lines - 1 ? 150 : double.infinity, 12, isDark),

      )),

    );

  }

  Widget _buildStickyBottomActions(bool isDark) {

    return Positioned(

      bottom: 0,

      left: 0,

      right: 0,

      child: Container(

        padding: const EdgeInsets.all(24),

        decoration: BoxDecoration(color: isDark ? AppTheme.backgroundDark : Colors.white, boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 10, offset: const Offset(0, -4))]),

        child: Row(

          children: [

            _buildSkeletonRect(56, 56, 16, isDark),

            const SizedBox(width: 16),

            Expanded(child: FadeTransition(opacity: _animation, child: Container(height: 56, decoration: BoxDecoration(color: const Color(0xFF00A870).withOpacity(0.5), borderRadius: BorderRadius.circular(16))))),

          ],

        ),

      ),

    );

  }

}
