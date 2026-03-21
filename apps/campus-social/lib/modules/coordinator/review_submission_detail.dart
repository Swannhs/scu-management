
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

class ReviewSubmissionDetailScreen extends StatelessWidget {

  const ReviewSubmissionDetailScreen({super.key});

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

              Row(

                mainAxisAlignment: MainAxisAlignment.spaceBetween,

                children: [

                  const Text('SUBMISSION DETAIL', style: TextStyle(color: Colors.grey, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1)),

                  Container(

                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),

                    decoration: BoxDecoration(color: Colors.red[50], borderRadius: BorderRadius.circular(20)),

                    child: Text('PENDING', style: TextStyle(color: Colors.red[900], fontSize: 8, fontWeight: FontWeight.bold)),

                  ),

                ],

              ),

              const SizedBox(height: 24),

              _buildUserInfo(isDark),

              const SizedBox(height: 32),

              const Text('Photo Proof', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

              const SizedBox(height: 16),

              _buildPhotoProof(isDark),

              const SizedBox(height: 32),

              _buildReflection(isDark),

              const SizedBox(height: 32),

              _buildStats(isDark),

              const SizedBox(height: 48),

              _buildActionButtons(context, isDark),

              const SizedBox(height: 40),

            ],

          ),

        ),

      ),

    );

  }

  Widget _buildUserInfo(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(20),

        boxShadow: [

          BoxShadow(

            color: Colors.black.withOpacity(0.02),

            blurRadius: 10,

            offset: const Offset(0, 4),

          ),

        ],

      ),

      child: Column(

        children: [

          Row(

            children: [

              const CircleAvatar(

                radius: 28,

                backgroundImage: NetworkImage('https://i.pravatar.cc/150?u=alexander'),

                backgroundColor: AppTheme.primary,

              ),

              const SizedBox(width: 16),

              Column(

                crossAxisAlignment: CrossAxisAlignment.start,

                children: [

                  const Text('Student Name', style: TextStyle(color: Colors.grey, fontSize: 11)),

                  const Text('Alexander Wright', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),

                ],

              ),

            ],

          ),

          const SizedBox(height: 20),

          Row(

            children: [

              _buildUserInfoItem('PROJECT', 'City Park Cleanup'),

              const Spacer(),

              _buildUserInfoItem('DATE SUBMITTED', 'Oct 24, 2023'),

            ],

          ),

        ],

      ),

    );

  }

  Widget _buildUserInfoItem(String label, String value) {

    return Column(

      crossAxisAlignment: CrossAxisAlignment.start,

      children: [

        Text(label, style: const TextStyle(color: Colors.grey, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 0.5)),

        const SizedBox(height: 4),

        Text(value, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),

      ],

    );

  }

  Widget _buildPhotoProof(bool isDark) {

    return Container(

      height: 240,

      width: double.infinity,

      decoration: BoxDecoration(

        borderRadius: BorderRadius.circular(24),

        image: const DecorationImage(

          image: NetworkImage('https://images.unsplash.com/photo-1544333346-64660334805d?w=800'),

          fit: BoxFit.cover,

        ),

      ),

      child: Stack(

        children: [

          Positioned(

            bottom: 16,

            right: 16,

            child: Container(

              padding: const EdgeInsets.all(8),

              decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(10)),

              child: const Icon(Icons.zoom_in, color: Colors.grey),

            ),

          ),

        ],

      ),

    );

  }

  Widget _buildReflection(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(24),

      decoration: BoxDecoration(

        color: isDark ? Color(0xFF020617) : Colors.grey[100],

        borderRadius: BorderRadius.circular(24),

      ),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          Row(

            children: [

              const Icon(Icons.format_quote, color: AppTheme.primary, size: 20),

              const SizedBox(width: 8),

              Text('STUDENT REFLECTION', style: TextStyle(color: AppTheme.primary, fontSize: 11, fontWeight: FontWeight.bold, letterSpacing: 1)),

            ],

          ),

          const SizedBox(height: 12),

          Text(

            "Participating in the City Park Cleanup was a truly rewarding experience. We managed to collect over 15 bags of recyclables from the north sector. Seeing the immediate impact of our work on the environment helped me realize the importance of community service. I learned how teamwork can make even the most tedious tasks enjoyable.",

            style: TextStyle(color: isDark ? Colors.grey[400] : Colors.grey[700], fontSize: 13, height: 1.6, fontStyle: FontStyle.italic),

          ),

        ],

      ),

    );

  }

  Widget _buildStats(bool isDark) {

    return Row(

      children: [

        Expanded(

          child: Container(

            padding: const EdgeInsets.all(16),

            decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16), boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 10, offset: const Offset(0, 4))]),

            child: Row(

              children: [

                Container(padding: const EdgeInsets.all(8), decoration: BoxDecoration(color: AppTheme.primary.withOpacity(0.1), shape: BoxShape.circle), child: const Icon(Icons.timer, color: AppTheme.primary, size: 18)),

                const SizedBox(width: 12),

                Column(

                  crossAxisAlignment: CrossAxisAlignment.start,

                  children: [

                    const Text('HOURS', style: TextStyle(color: Colors.grey, fontSize: 9, fontWeight: FontWeight.bold)),

                    const Text('4.5 Hours', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),

                  ],

                ),

              ],

            ),

          ),

        ),

        const SizedBox(width: 16),

        Expanded(

          child: Container(

            padding: const EdgeInsets.all(16),

            decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16), boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 10, offset: const Offset(0, 4))]),

            child: Row(

              children: [

                Container(padding: const EdgeInsets.all(8), decoration: BoxDecoration(color: Colors.orange.withOpacity(0.1), shape: BoxShape.circle), child: const Icon(Icons.location_on, color: Colors.orange, size: 18)),

                const SizedBox(width: 12),

                Column(

                  crossAxisAlignment: CrossAxisAlignment.start,

                  children: [

                    const Text('LOCATION', style: TextStyle(color: Colors.grey, fontSize: 9, fontWeight: FontWeight.bold)),

                    const Text('Central Park', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),

                  ],

                ),

              ],

            ),

          ),

        ),

      ],

    );

  }

  Widget _buildActionButtons(BuildContext context, bool isDark) {

    return Row(

      children: [

        Expanded(

          child: OutlinedButton(

            onPressed: () => _handleReject(context),

            style: OutlinedButton.styleFrom(

              foregroundColor: Colors.red,

              side: const BorderSide(color: Colors.red),

              minimumSize: const Size(0, 56),

              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),

            ),

            child: const Text('Reject Submission', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13), textAlign: TextAlign.center),

          ),

        ),

        const SizedBox(width: 16),

        Expanded(

          child: ElevatedButton(

            onPressed: () => _handleApprove(context),

            style: ElevatedButton.styleFrom(

              backgroundColor: AppTheme.primary,

              foregroundColor: Colors.white,

              minimumSize: const Size(0, 56),

              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),

              elevation: 0,

            ),

            child: const Text('Approve Submission', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13), textAlign: TextAlign.center),

          ),

        ),

      ],

    );

  }

  void _handleApprove(BuildContext context) {

    ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Submission Approved Successfully!'), backgroundColor: AppTheme.primary));

    Navigator.pop(context);

  }

  void _handleReject(BuildContext context) {

    ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Submission Rejected.'), backgroundColor: Colors.red));

    Navigator.pop(context);

  }

}
