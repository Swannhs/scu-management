
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class TeacherVerificationQueueScreen extends StatelessWidget {

  const TeacherVerificationQueueScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : AppTheme.backgroundLight,

      appBar: AppBar(

        title: const Text('Verification Queue', style: TextStyle(fontWeight: FontWeight.bold)),

        leading: IconButton(icon: const Icon(Icons.arrow_back), onPressed: () => Navigator.pop(context)),

        actions: [

          IconButton(icon: const Icon(Icons.more_vert), onPressed: () {}),

        ],

        backgroundColor: Colors.transparent,

        elevation: 0,

        foregroundColor: isDark ? Colors.white : Colors.black,

      ),

      body: SingleChildScrollView(

        child: Padding(

          padding: const EdgeInsets.all(24.0),

          child: Column(

            crossAxisAlignment: CrossAxisAlignment.start,

            children: [

              _buildEcosystemCard(isDark),

              const SizedBox(height: 32),

              _buildSearchRow(isDark),

              const SizedBox(height: 40),

              const Text('NEEDS REVIEW', style: TextStyle(color: Colors.grey, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1.5)),

              const SizedBox(height: 16),

              _buildReviewCard(context, 'Julianne Moore', 'Eco-Gardening Log', 'SUBMITTED 2H AGO', 'JM', isDark),

              const SizedBox(height: 16),

              _buildReviewCard(context, 'Liam Henderson', 'Senior Care Program', 'SUBMITTED 5H AGO', null, isDark, isUrgent: true),

              const SizedBox(height: 16),

              _buildReviewCard(context, 'Sarah Connor', 'Literacy Tutoring', 'SUBMITTED YESTERDAY', 'Batch #24', isDark),

              const SizedBox(height: 40),

              _buildProgressHint(isDark),

              const SizedBox(height: 100),

            ],

          ),

        ),

      ),

      bottomNavigationBar: const BottomNav(currentIndex: 2), // Service index

    );

  }

  Widget _buildEcosystemCard(bool isDark) {

    return Container(

      width: double.infinity,

      padding: const EdgeInsets.all(32),

      decoration: BoxDecoration(

        color: AppTheme.primary,

        borderRadius: BorderRadius.circular(32),

        boxShadow: [BoxShadow(color: AppTheme.primary.withOpacity(0.3), blurRadius: 20, offset: const Offset(0, 10))],

      ),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          const Text('Current Ecosystem', style: TextStyle(color: Colors.white70, fontSize: 12, fontWeight: FontWeight.bold)),

          const SizedBox(height: 8),

          const Text('14 Active Projects', style: TextStyle(color: Colors.white, fontSize: 32, fontWeight: FontWeight.w900)),

          const SizedBox(height: 24),

          Row(

            children: [

              _buildSmallStatCard('PENDING', '28'),

              const SizedBox(width: 16),

              _buildSmallStatCard('VERIFIED', '142'),

            ],

          ),

        ],

      ),

    );

  }

  Widget _buildSmallStatCard(String label, String value) {

    return Container(

      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),

      decoration: BoxDecoration(color: Colors.white.withOpacity(0.2), borderRadius: BorderRadius.circular(16)),

      child: Column(

        children: [

          Text(label, style: const TextStyle(color: Colors.white70, fontSize: 9, fontWeight: FontWeight.bold, letterSpacing: 0.5)),

          Text(value, style: const TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.w900)),

        ],

      ),

    );

  }

  Widget _buildSearchRow(bool isDark) {

    return Row(

      children: [

        Expanded(

          child: Container(

            padding: const EdgeInsets.symmetric(horizontal: 16),

            decoration: BoxDecoration(color: Colors.grey[100], borderRadius: BorderRadius.circular(16)),

            child: const TextField(

              decoration: InputDecoration(

                hintText: 'Search students...',

                hintStyle: TextStyle(color: Colors.grey, fontSize: 14),

                icon: Icon(Icons.search, color: Colors.grey, size: 20),

                border: InputBorder.none,

              ),

            ),

          ),

        ),

        const SizedBox(width: 12),

        Container(

          padding: const EdgeInsets.all(12),

          decoration: BoxDecoration(color: Colors.grey[100], borderRadius: BorderRadius.circular(12)),

          child: const Icon(Icons.tune, color: Colors.black54),

        ),

      ],

    );

  }

  Widget _buildReviewCard(BuildContext context, String name, String project, String time, String? meta, bool isDark, {bool isUrgent = false}) {

    return GestureDetector(

      onTap: () => Navigator.pushNamed(context, '/review-submission-detail'), // Use correct context

      child: Container(

        padding: const EdgeInsets.all(20),

        decoration: BoxDecoration(

          color: isDark ? AppTheme.cardDark : Colors.white,

          borderRadius: BorderRadius.circular(24),

          boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 10, offset: const Offset(0, 4))],

        ),

        child: Column(

          children: [

            Row(

              children: [

                CircleAvatar(radius: 28, child: Text(name[0])),

                const SizedBox(width: 16),

                Expanded(

                  child: Column(

                    crossAxisAlignment: CrossAxisAlignment.start,

                    children: [

                      Text(name, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),

                      Row(

                        children: [

                          const Icon(Icons.description, size: 14, color: Colors.grey),

                          const SizedBox(width: 6),

                          Text(project, style: TextStyle(color: Colors.grey[500], fontSize: 13)),

                        ],

                      ),

                    ],

                  ),

                ),

                ElevatedButton(

                  onPressed: () {}, // Navigator handled by GestureDetector for simplicity

                  style: ElevatedButton.styleFrom(backgroundColor: AppTheme.primary, foregroundColor: Colors.white, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)), elevation: 0),

                  child: const Text('Review', style: TextStyle(fontWeight: FontWeight.bold)),

                ),

              ],

            ),

            const Divider(height: 32),

            Row(

              mainAxisAlignment: MainAxisAlignment.spaceBetween,

              children: [

                Text(time, style: TextStyle(color: Colors.grey[400], fontSize: 10, fontWeight: FontWeight.bold)),

                if (isUrgent)

                  Container(padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4), decoration: BoxDecoration(color: Colors.red[50], borderRadius: BorderRadius.circular(8)), child: Text('URGENT', style: TextStyle(color: Colors.red[900], fontSize: 8, fontWeight: FontWeight.bold)))

                else if (meta != null)

                  Text(meta, style: TextStyle(color: Colors.grey[400], fontSize: 10, fontWeight: FontWeight.bold)),

              ],

            ),

          ],

        ),

      ),

    );

  }

  Widget _buildProgressHint(bool isDark) {

    return Container(

      width: double.infinity,

      padding: const EdgeInsets.all(32),

      decoration: BoxDecoration(

        color: Colors.transparent,

        borderRadius: BorderRadius.circular(24),

        border: Border.all(color: Colors.grey[200]!, style: BorderStyle.none), // Dotted border would need a painter

      ),

      child: Column(

        children: [

          Container(padding: const EdgeInsets.all(8), decoration: BoxDecoration(color: Colors.grey[200], shape: BoxShape.circle), child: const Icon(Icons.check, color: Colors.white, size: 16)),

          const SizedBox(height: 12),

          Text("You're making great progress!", style: TextStyle(color: Colors.grey[400], fontSize: 13, fontWeight: FontWeight.w500)),

        ],

      ),

    );

  }

}
