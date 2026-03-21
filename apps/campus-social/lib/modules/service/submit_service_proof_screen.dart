
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class SubmitServiceProofScreen extends StatelessWidget {

  const SubmitServiceProofScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : AppTheme.backgroundLight,

      appBar: AppBar(

        title: const Text('EduServe', style: TextStyle(fontWeight: FontWeight.bold, color: AppTheme.primary)),

        leading: IconButton(icon: const Icon(Icons.arrow_back), onPressed: () => Navigator.pop(context)),

        actions: [

          IconButton(

            icon: const CircleAvatar(

              radius: 16,

              backgroundImage: NetworkImage('https://i.pravatar.cc/150?u=alex'),

            ),

            onPressed: () {},

          ),

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

              Row(

                mainAxisAlignment: MainAxisAlignment.spaceBetween,

                children: [

                  const Text('Submit Proof', style: TextStyle(fontSize: 28, fontWeight: FontWeight.w900, fontFamily: 'Public Sans')),

                  Container(

                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),

                    decoration: BoxDecoration(color: Colors.green[50], borderRadius: BorderRadius.circular(10)),

                    child: const Text('ACTIVE SESSION', style: TextStyle(color: AppTheme.primary, fontSize: 10, fontWeight: FontWeight.bold)),

                  ),

                ],

              ),

              const SizedBox(height: 32),

              _buildServiceSummary(isDark),

              const SizedBox(height: 32),

              _buildSectionTitle('Hours worked'),

              const SizedBox(height: 12),

              _buildHoursTextField(isDark),

              const SizedBox(height: 32),

              _buildSectionTitle('Photo evidence'),

              const SizedBox(height: 12),

              _buildUploadBox(isDark),

              const SizedBox(height: 32),

              _buildSectionTitle('Reflection'),

              const SizedBox(height: 12),

              _buildReflectionTextField(isDark),

              const SizedBox(height: 48),

              _buildActionButtons(context, isDark),

              const SizedBox(height: 100),

            ],

          ),

        ),

      ),

      bottomNavigationBar: const BottomNav(currentIndex: 2),

    );

  }

  Widget _buildSectionTitle(String title) {

    return Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Colors.grey));

  }

  Widget _buildServiceSummary(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(24),

        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 10, offset: const Offset(0, 4))],

      ),

      child: Row(

        children: [

          Container(

            padding: const EdgeInsets.all(12),

            decoration: BoxDecoration(color: Colors.green[50], borderRadius: BorderRadius.circular(16)),

            child: const Icon(Icons.park, color: AppTheme.primary),

          ),

          const SizedBox(width: 16),

          Expanded(

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                const Text('City Park Restoration', style: TextStyle(fontWeight: FontWeight.w900, fontSize: 16, fontFamily: 'Public Sans')),

                const SizedBox(height: 4),

                Row(

                  children: [

                    const Icon(Icons.calendar_today, size: 10, color: Colors.grey),

                    const SizedBox(width: 4),

                    Text('Oct 24, 2023', style: TextStyle(color: Colors.grey[500], fontSize: 11)),

                    const SizedBox(width: 12),

                    const Icon(Icons.person, size: 10, color: Colors.grey),

                    const SizedBox(width: 4),

                    Text('Sarah Jenkins', style: TextStyle(color: Colors.grey[500], fontSize: 11)),

                  ],

                ),

              ],

            ),

          ),

        ],

      ),

    );

  }

  Widget _buildHoursTextField(bool isDark) {

    return Container(

      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 8),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.grey[100],

        borderRadius: BorderRadius.circular(20),

      ),

      child: Row(

        children: [

          Expanded(

            child: TextField(

              keyboardType: TextInputType.number,

              decoration: InputDecoration(

                hintText: 'e.g. 4.5',

                hintStyle: TextStyle(color: Colors.grey[400]),

                border: InputBorder.none,

              ),

            ),

          ),

          Text('hours', style: TextStyle(color: Colors.grey[500], fontWeight: FontWeight.bold)),

        ],

      ),

    );

  }

  Widget _buildUploadBox(bool isDark) {

    return Container(

      width: double.infinity,

      height: 180,

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(24),

        border: Border.all(color: Colors.grey[300]!, width: 1.5, style: BorderStyle.solid),

      ),

      child: Column(

        mainAxisAlignment: MainAxisAlignment.center,

        children: [

          Container(

            padding: const EdgeInsets.all(12),

            decoration: BoxDecoration(color: AppTheme.primary.withOpacity(0.1), shape: BoxShape.circle),

            child: const Icon(Icons.camera_alt, color: AppTheme.primary),

          ),

          const SizedBox(height: 16),

          const Text('Upload Photo', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

          const SizedBox(height: 4),

          Text('or Drag & Drop', style: TextStyle(color: Colors.grey[400], fontSize: 12)),

        ],

      ),

    );

  }

  Widget _buildReflectionTextField(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(24),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.grey[100],

        borderRadius: BorderRadius.circular(24),

      ),

      child: TextField(

        maxLines: 4,

        decoration: InputDecoration(

          hintText: 'What did you learn from this session?',

          hintStyle: TextStyle(color: Colors.grey[400], height: 1.5),

          border: InputBorder.none,

        ),

      ),

    );

  }

  Widget _buildActionButtons(BuildContext context, bool isDark) {

    return Column(

      children: [

        ElevatedButton(

          onPressed: () {

            Navigator.pushNamed(context, '/submission-status');

          },

          style: ElevatedButton.styleFrom(

            backgroundColor: AppTheme.primary,

            foregroundColor: Colors.white,

            minimumSize: const Size(double.infinity, 64),

            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),

            elevation: 0,

          ),

          child: const Text('Submit for Verification', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),

        ),

        const SizedBox(height: 16),

        TextButton(

          onPressed: () {},

          style: TextButton.styleFrom(

            backgroundColor: isDark ? Colors.white.withOpacity(0.05) : Colors.white,

            minimumSize: const Size(double.infinity, 64),

            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20), side: BorderSide(color: Colors.grey[200]!)),

          ),

          child: const Text('Save as Draft', style: TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold, fontSize: 16)),

        ),

      ],

    );

  }

}
