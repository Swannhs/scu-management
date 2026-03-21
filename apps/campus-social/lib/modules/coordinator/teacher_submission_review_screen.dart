
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

class TeacherSubmissionReviewScreen extends StatelessWidget {

  const TeacherSubmissionReviewScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : const Color(0xFFF8F9FA),

      appBar: AppBar(

        title: const Text('Review Submission', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18, color: Color(0xFF007A5E))),

        leading: IconButton(icon: const Icon(Icons.arrow_back, color: Color(0xFF007A5E)), onPressed: () => Navigator.pop(context)),

        actions: [

          IconButton(icon: const Icon(Icons.notifications_none, color: Color(0xFF007A5E)), onPressed: () {}),

          Padding(

            padding: const EdgeInsets.only(right: 16.0),

            child: CircleAvatar(radius: 16, backgroundColor: Colors.amber[100]),

          ),

        ],

        backgroundColor: Colors.white,

        elevation: 0,

      ),

      body: SingleChildScrollView(

        child: Padding(

          padding: const EdgeInsets.all(24.0),

          child: Column(

            crossAxisAlignment: CrossAxisAlignment.start,

            children: [

              _buildStudentHeader(isDark),

              const SizedBox(height: 24),

              _buildProjectDetails(isDark),

              const SizedBox(height: 32),

              Row(

                mainAxisAlignment: MainAxisAlignment.spaceBetween,

                children: [

                  const Text('Submitted Proof', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, fontFamily: 'Public Sans')),

                  TextButton(onPressed: () {}, child: const Text('VIEW FULLSCREEN', style: TextStyle(color: Color(0xFF007A5E), fontSize: 11, fontWeight: FontWeight.bold))),

                ],

              ),

              const SizedBox(height: 12),

              ClipRRect(

                borderRadius: BorderRadius.circular(20),

                child: Image.network(

                  'https://images.unsplash.com/photo-1599423300746-b62533397364?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',

                  height: 240,

                  width: double.infinity,

                  fit: BoxFit.cover,

                ),

              ),

              const SizedBox(height: 24),

              _buildReflectionBox(isDark),

              const SizedBox(height: 32),

              const Text('Internal Feedback & Notes', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, fontFamily: 'Public Sans')),

              const SizedBox(height: 12),

              _buildFeedbackInput(isDark),

              const SizedBox(height: 40),

              _buildActionButtons(context),

              const SizedBox(height: 100),

            ],

          ),

        ),

      ),

    );

  }

  Widget _buildStudentHeader(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(16),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(20),

        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 10, offset: const Offset(0, 4))],

      ),

      child: Row(

        children: [

          const CircleAvatar(

            radius: 30,

            backgroundImage: NetworkImage('https://i.pravatar.cc/150?u=alex_rivera'),

          ),

          const SizedBox(width: 16),

          Expanded(

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                const Text('Alex Rivera', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),

                const SizedBox(height: 6),

                Row(

                  children: [

                    _buildSmallBadge('ID: 284021', Colors.grey[100]!, Colors.grey[700]!),

                    const SizedBox(width: 8),

                    _buildSmallBadge('Grade 11-B', const Color(0xFFE9FAEF), const Color(0xFF007A5E)),

                  ],

                ),

              ],

            ),

          ),

        ],

      ),

    );

  }

  Widget _buildProjectDetails(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(20),

        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 10, offset: const Offset(0, 4))],

      ),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          Row(

            mainAxisAlignment: MainAxisAlignment.spaceBetween,

            children: [

              Column(

                crossAxisAlignment: CrossAxisAlignment.start,

                children: [

                  Text('PROJECT TITLE', style: TextStyle(color: Colors.grey[500], fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 0.5)),

                  const SizedBox(height: 4),

                  const Text('City Park Restoration', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Color(0xFF007A5E))),

                ],

              ),

              Container(

                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),

                decoration: BoxDecoration(color: const Color(0xFFE9FAEF), borderRadius: BorderRadius.circular(20)),

                child: Row(

                  children: [

                    Icon(Icons.schedule, color: Color(0xFF007A5E), size: 14),

                    SizedBox(width: 4),

                    Text('4.0 Hours', style: TextStyle(color: Color(0xFF007A5E), fontSize: 11, fontWeight: FontWeight.bold)),

                  ],

                ),

              ),

            ],

          ),

          const SizedBox(height: 20),

          Row(

            children: [

              Expanded(

                child: Column(

                  crossAxisAlignment: CrossAxisAlignment.start,

                  children: [

                    Text('DATE', style: TextStyle(color: Colors.grey[500], fontSize: 10, fontWeight: FontWeight.bold)),

                    const SizedBox(height: 4),

                    const Text('Oct 24, 2023', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),

                  ],

                ),

              ),

              Expanded(

                child: Column(

                  crossAxisAlignment: CrossAxisAlignment.start,

                  children: [

                    Text('LOCATION', style: TextStyle(color: Colors.grey[500], fontSize: 10, fontWeight: FontWeight.bold)),

                    const SizedBox(height: 4),

                    const Text('Central District Park', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),

                  ],

                ),

              ),

            ],

          ),

        ],

      ),

    );

  }

  Widget _buildReflectionBox(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : const Color(0xFFF1F3F5).withOpacity(0.5),

        borderRadius: BorderRadius.circular(20),

      ),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          Text('STUDENT REFLECTION', style: TextStyle(color: Colors.grey[500], fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 0.5)),

          const SizedBox(height: 12),

          Text(

            '"Today we focused on clearing the debris from the north quadrant. It was challenging because of the recent rain, but we managed to prepare three new soil beds for the native wildflower seeding. I learned about soil drainage and local biodiversity."',

            style: TextStyle(color: isDark ? Colors.grey[400] : Colors.grey[700], fontSize: 13, height: 1.6, fontStyle: FontStyle.italic),

          ),

        ],

      ),

    );

  }

  Widget _buildSmallBadge(String text, Color bg, Color fg) {

    return Container(

      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),

      decoration: BoxDecoration(color: bg, borderRadius: BorderRadius.circular(6)),

      child: Text(text, style: TextStyle(color: fg, fontSize: 10, fontWeight: FontWeight.bold)),

    );

  }

  Widget _buildFeedbackInput(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(16),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : const Color(0xFFE9ECEF),

        borderRadius: BorderRadius.circular(16),

      ),

      child: TextField(

        maxLines: 4,

        decoration: InputDecoration(

          hintText: 'Provide feedback or reasons for decision...',

          hintStyle: TextStyle(color: Colors.grey[500], fontSize: 14),

          border: InputBorder.none,

        ),

      ),

    );

  }

  Widget _buildActionButtons(BuildContext context) {

    return Column(

      children: [

        ElevatedButton(

          onPressed: () {},

          style: ElevatedButton.styleFrom(

            backgroundColor: const Color(0xFF008D58),

            foregroundColor: Colors.white,

            minimumSize: const Size(double.infinity, 56),

            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),

            elevation: 0,

          ),

          child: const Text('Approve Submission', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

        ),

        const SizedBox(height: 16),

        Row(

          children: [

            Expanded(

              child: OutlinedButton(

                onPressed: () {},

                style: OutlinedButton.styleFrom(

                  foregroundColor: Colors.grey[700],

                  side: BorderSide(color: Colors.grey[300]!),

                  minimumSize: const Size(0, 56),

                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),

                ),

                child: Row(

                  mainAxisAlignment: MainAxisAlignment.center,

                  children: [

                    Icon(Icons.history, size: 18),

                    SizedBox(width: 8),

                    Text('Resubmit', style: TextStyle(fontWeight: FontWeight.bold)),

                  ],

                ),

              ),

            ),

            const SizedBox(width: 16),

            Expanded(

              child: OutlinedButton(

                onPressed: () {},

                style: OutlinedButton.styleFrom(

                  foregroundColor: Colors.red,

                  side: const BorderSide(color: Color(0xFFFFD1D1)),

                  minimumSize: const Size(0, 56),

                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),

                ),

                child: Row(

                  mainAxisAlignment: MainAxisAlignment.center,

                  children: [

                    Icon(Icons.cancel_outlined, size: 18),

                    SizedBox(width: 8),

                    Text('Reject', style: TextStyle(fontWeight: FontWeight.bold)),

                  ],

                ),

              ),

            ),

          ],

        ),

      ],

    );

  }

}
