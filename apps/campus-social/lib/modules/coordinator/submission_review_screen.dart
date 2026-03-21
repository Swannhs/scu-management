
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class SubmissionReviewScreen extends StatelessWidget {

  const SubmissionReviewScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : AppTheme.backgroundLight,

      appBar: AppBar(

        title: const Text('Review Submission', style: TextStyle(fontWeight: FontWeight.bold)),

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

              _buildStatusCard(isDark),

              const SizedBox(height: 32),

              _buildSectionHeader('HOURS LOGGED', true),

              const SizedBox(height: 16),

              _buildHoursCard(isDark),

              const SizedBox(height: 32),

              _buildSectionHeader('PHOTO EVIDENCE', true),

              const SizedBox(height: 16),

              _buildPhotoEvidence(isDark),

              const SizedBox(height: 32),

              _buildSectionHeader('REFLECTION', true),

              const SizedBox(height: 16),

              _buildReflectionCard(isDark),

              const SizedBox(height: 48),

              _buildActionButtons(context, isDark),

              const SizedBox(height: 100),

            ],

          ),

        ),

      ),

      bottomNavigationBar: const BottomNav(currentIndex: 2), // Activity index? The screenshot shows 'Activity' as the second tab.

    );

  }

  Widget _buildStatusCard(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(24),

        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 10, offset: const Offset(0, 4))],

      ),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          Row(

            mainAxisAlignment: MainAxisAlignment.spaceBetween,

            children: [

              Container(

                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),

                decoration: BoxDecoration(color: Colors.green[50], borderRadius: BorderRadius.circular(8)),

                child: const Text('IN PROGRESS', style: TextStyle(color: AppTheme.primary, fontSize: 10, fontWeight: FontWeight.bold)),

              ),

              const Text('Oct 24, 2023', style: TextStyle(color: Colors.grey, fontSize: 12)),

            ],

          ),

          const SizedBox(height: 16),

          const Text('City Park Restoration', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),

          const SizedBox(height: 4),

          Row(

            children: [

              const Icon(Icons.location_on, size: 14, color: Colors.grey),

              const SizedBox(width: 4),

              Text('Downtown District', style: TextStyle(color: Colors.grey[500], fontSize: 13)),

            ],

          ),

        ],

      ),

    );

  }

  Widget _buildSectionHeader(String title, bool showEdit) {

    return Row(

      mainAxisAlignment: MainAxisAlignment.spaceBetween,

      children: [

        Text(title, style: const TextStyle(color: Colors.grey, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1)),

        if (showEdit)

          TextButton.icon(

            onPressed: () {},

            icon: const Icon(Icons.edit, size: 14, color: AppTheme.primary),

            label: const Text('Edit', style: TextStyle(color: AppTheme.primary, fontSize: 12, fontWeight: FontWeight.bold)),

            style: TextButton.styleFrom(padding: EdgeInsets.zero, minimumSize: Size.zero, tapTargetSize: MaterialTapTargetSize.shrinkWrap),

          ),

      ],

    );

  }

  Widget _buildHoursCard(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.grey[50],

        borderRadius: BorderRadius.circular(24),

      ),

      child: Row(

        children: [

          Container(

            padding: const EdgeInsets.all(12),

            decoration: BoxDecoration(color: AppTheme.primary.withOpacity(0.1), shape: BoxShape.circle),

            child: const Icon(Icons.access_time, color: AppTheme.primary),

          ),

          const SizedBox(width: 16),

          Column(

            crossAxisAlignment: CrossAxisAlignment.start,

            children: [

              const Text('4.5 hours', style: TextStyle(fontSize: 24, fontWeight: FontWeight.w900, fontFamily: 'Public Sans', letterSpacing: -0.5)),

              Text('Total service duration', style: TextStyle(color: Colors.grey[500], fontSize: 12)),

            ],

          ),

        ],

      ),

    );

  }

  Widget _buildPhotoEvidence(bool isDark) {

    return Container(

      height: 200,

      width: double.infinity,

      decoration: BoxDecoration(

        borderRadius: BorderRadius.circular(24),

        image: const DecorationImage(image: NetworkImage('https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?w=800'), fit: BoxFit.cover),

      ),

      child: Container(

        padding: const EdgeInsets.all(16),

        alignment: Alignment.bottomLeft,

        decoration: BoxDecoration(borderRadius: BorderRadius.circular(24), gradient: LinearGradient(begin: Alignment.topCenter, end: Alignment.bottomCenter, colors: [Colors.transparent, Colors.black.withOpacity(0.6)])),

        child: Container(

          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),

          decoration: BoxDecoration(color: Colors.white.withOpacity(0.9), borderRadius: BorderRadius.circular(8)),

          child: Row(

            mainAxisSize: MainAxisSize.min,

            children: const [

              Icon(Icons.image, size: 12, color: Colors.black54),

              SizedBox(width: 6),

              Text('IMG_2023_OCT_24.JPG', style: TextStyle(color: Colors.black87, fontSize: 10, fontWeight: FontWeight.bold)),

            ],

          ),

        ),

      ),

    );

  }

  Widget _buildReflectionCard(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(24),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.grey[50],

        borderRadius: BorderRadius.circular(24),

        border: Border(left: BorderSide(color: AppTheme.primary, width: 4)),

      ),

      child: Text(

        '"The restoration project was a great way to give back to the community. We planted over 20 native shrubs and cleared debris from the northern creek bed. It was rewarding to see the immediate transformation of the area."',

        style: TextStyle(fontSize: 14, height: 1.6, fontStyle: FontStyle.italic, color: isDark ? Colors.white70 : Colors.black87),

      ),

    );

  }

  Widget _buildActionButtons(BuildContext context, bool isDark) {

    return Column(

      children: [

        ElevatedButton(

          onPressed: () {

            ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Submission sent for verification!'), backgroundColor: AppTheme.primary));

          },

          style: ElevatedButton.styleFrom(

            backgroundColor: AppTheme.primary,

            foregroundColor: Colors.white,

            minimumSize: const Size(double.infinity, 64),

            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),

            elevation: 0,

          ),

          child: Row(

            mainAxisAlignment: MainAxisAlignment.center,

            children: const [

              Text('Submit for Verification', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),

              SizedBox(width: 12),

              Icon(Icons.send, size: 20),

            ],

          ),

        ),

        const SizedBox(height: 16),

        TextButton(

          onPressed: () {},

          style: TextButton.styleFrom(

            backgroundColor: isDark ? Colors.white.withOpacity(0.05) : Colors.grey[100],

            minimumSize: const Size(double.infinity, 64),

            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),

          ),

          child: Text('Save as Draft', style: TextStyle(color: isDark ? Colors.white : Colors.black87, fontWeight: FontWeight.bold, fontSize: 16)),

        ),

      ],

    );

  }

}
