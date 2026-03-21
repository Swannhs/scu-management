
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

class TeacherApplicationReviewScreen extends StatelessWidget {

  const TeacherApplicationReviewScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : const Color(0xFFF8F9FA),

      appBar: AppBar(

        title: const Text('Application Review', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),

        leading: IconButton(icon: const Icon(Icons.arrow_back), onPressed: () => Navigator.pop(context)),

        backgroundColor: Colors.transparent,

        elevation: 0,

        foregroundColor: isDark ? Colors.white : Colors.black,

      ),

      body: SingleChildScrollView(

        child: Padding(

          padding: const EdgeInsets.symmetric(horizontal: 24.0),

          child: Column(

            crossAxisAlignment: CrossAxisAlignment.start,

            children: [

              _buildStudentCard(isDark),

              const SizedBox(height: 24),

              _buildProjectBanner(isDark),

              const SizedBox(height: 32),

              _buildSectionHeader('STATEMENT OF INTEREST'),

              const SizedBox(height: 12),

              _buildStatementBox(isDark),

              const SizedBox(height: 32),

              _buildSectionHeader('PREVIOUS EXPERIENCE'),

              const SizedBox(height: 12),

              _buildExperienceItem('School Garden Club (2 years)', isDark),

              const SizedBox(height: 12),

              _buildExperienceItem('Beach Clean-up Volunteer 2023', isDark),

              const SizedBox(height: 32),

              _buildSectionHeader('DOCUMENTS'),

              const SizedBox(height: 12),

              Row(

                children: [

                  Expanded(child: _buildDocumentCard('alex_resume.pdf', Icons.picture_as_pdf, Colors.red[100]!, isDark)),

                  const SizedBox(width: 12),

                  Expanded(child: _buildDocumentCard('student_id.jpg', Icons.image, Colors.green[100]!, isDark)),

                ],

              ),

              const SizedBox(height: 32),

              Row(

                children: [

                  const Icon(Icons.edit_note, size: 20, color: Colors.grey),

                  const SizedBox(width: 8),

                  _buildSectionHeader('Internal Review Notes'),

                ],

              ),

              const SizedBox(height: 12),

              _buildNotesInput(isDark),

              const SizedBox(height: 120),

            ],

          ),

        ),

      ),

      bottomSheet: _buildBottomActions(context, isDark),

    );

  }

  Widget _buildStudentCard(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(24),

        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 10, offset: const Offset(0, 4))],

      ),

      child: Row(

        children: [

          const CircleAvatar(

            radius: 35,

            backgroundImage: NetworkImage('https://i.pravatar.cc/150?u=alex_rivera_v3'),

          ),

          const SizedBox(width: 16),

          Expanded(

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                const Text('Alex Rivera', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),

                const SizedBox(height: 4),

                Text('Grade 11 • Student ID: 28490', style: TextStyle(color: Colors.grey[600], fontSize: 13)),

                const SizedBox(height: 12),

                Row(

                  children: [

                    _buildTag('HONOR ROLL', const Color(0xFFC0F2D8), const Color(0xFF007A5E)),

                    const SizedBox(width: 8),

                    _buildTag('SOCIAL LEADER', const Color(0xFFC0F2D8), const Color(0xFF007A5E)),

                  ],

                ),

              ],

            ),

          ),

        ],

      ),

    );

  }

  Widget _buildTag(String text, Color bg, Color fg) {

    return Container(

      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),

      decoration: BoxDecoration(color: bg, borderRadius: BorderRadius.circular(6)),

      child: Text(text, style: TextStyle(color: fg, fontSize: 9, fontWeight: FontWeight.bold, letterSpacing: 0.5)),

    );

  }

  Widget _buildProjectBanner(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : const Color(0xFFF1F3F5).withOpacity(0.8),

        borderRadius: BorderRadius.circular(20),

        border: const Border(left: BorderSide(color: Color(0xFF00A870), width: 6)),

      ),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          Row(

            children: [

              Container(

                padding: const EdgeInsets.all(8),

                decoration: BoxDecoration(color: const Color(0xFFC0F2D8), borderRadius: BorderRadius.circular(10)),

                child: const Icon(Icons.eco, color: Color(0xFF007A5E), size: 20),

              ),

              const SizedBox(width: 12),

              const Expanded(

                child: Text('City Park Restoration', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),

              ),

            ],

          ),

          const SizedBox(height: 12),

          Row(

            children: [

              const Icon(Icons.calendar_today_outlined, size: 14, color: Colors.grey),

              const SizedBox(width: 6),

              const Text('Oct 24, 2024', style: TextStyle(fontSize: 12, color: Colors.grey)),

              const Spacer(),

              const Icon(Icons.schedule, size: 14, color: Colors.grey),

              const SizedBox(width: 6),

              const Text('8:00 AM - 2:00 PM', style: TextStyle(fontSize: 12, color: Colors.grey)),

            ],

          ),

          const SizedBox(height: 12),

          Text(

            'Helping with community landscaping and urban garden maintenance in Central Sector.',

            style: TextStyle(color: Colors.grey[600], fontSize: 13, height: 1.4),

          ),

        ],

      ),

    );

  }

  Widget _buildSectionHeader(String title) {

    return Text(title, style: TextStyle(color: Colors.grey[600], fontSize: 11, fontWeight: FontWeight.bold, letterSpacing: 1));

  }

  Widget _buildStatementBox(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(20),

        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.01), blurRadius: 10, offset: const Offset(0, 4))],

      ),

      child: Text(

        '"I am passionate about environmental sustainability and have always lived near City Park. This opportunity allows me to give back to my neighborhood while learning practical gardening skills from professionals."',

        style: TextStyle(color: Colors.grey[700], fontSize: 14, height: 1.6, fontStyle: FontStyle.italic),

      ),

    );

  }

  Widget _buildExperienceItem(String text, bool isDark) {

    return Container(

      padding: const EdgeInsets.all(16),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(16),

      ),

      child: Row(

        children: [

          const Icon(Icons.check_circle, color: Color(0xFF00A870), size: 18),

          const SizedBox(width: 12),

          Text(text, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w500)),

        ],

      ),

    );

  }

  Widget _buildDocumentCard(String filename, IconData icon, Color iconBg, bool isDark) {

    return Container(

      padding: const EdgeInsets.all(12),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.grey[200]!.withOpacity(0.5),

        borderRadius: BorderRadius.circular(16),

      ),

      child: Row(

        children: [

          Container(

            padding: const EdgeInsets.all(8),

            decoration: BoxDecoration(color: isDark ? Colors.white10 : Colors.white, borderRadius: BorderRadius.circular(10)),

            child: Icon(icon, color: Colors.grey[700], size: 20),

          ),

          const SizedBox(width: 12),

          Expanded(

            child: Text(filename, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold), overflow: TextOverflow.ellipsis),

          ),

        ],

      ),

    );

  }

  Widget _buildNotesInput(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(16),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : const Color(0xFFE9ECEF),

        borderRadius: BorderRadius.circular(20),

      ),

      child: TextField(

        maxLines: 4,

        decoration: InputDecoration(

          hintText: 'Add a private note regarding this application...',

          hintStyle: TextStyle(color: Colors.grey[500], fontSize: 13),

          border: InputBorder.none,

        ),

      ),

    );

  }

  Widget _buildBottomActions(BuildContext context, bool isDark) {

    return Container(

      padding: const EdgeInsets.all(24),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.backgroundDark : Colors.white,

        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 10, offset: const Offset(0, -4))],

      ),

      child: Row(

        children: [

          Expanded(

            child: TextButton.icon(

              onPressed: () {},

              icon: const Icon(Icons.close, color: Colors.grey),

              label: const Text('Reject', style: TextStyle(color: Colors.grey, fontWeight: FontWeight.bold)),

              style: TextButton.styleFrom(minimumSize: const Size(0, 56)),

            ),

          ),

          const SizedBox(width: 16),

          Expanded(

            child: ElevatedButton.icon(

              onPressed: () {},

              icon: const Icon(Icons.check_circle, color: Colors.white),

              label: const Text('Approve', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

              style: ElevatedButton.styleFrom(

                backgroundColor: const Color(0xFF00A870),

                foregroundColor: Colors.white,

                minimumSize: const Size(0, 56),

                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),

                elevation: 0,

              ),

            ),

          ),

        ],

      ),

    );

  }

}
