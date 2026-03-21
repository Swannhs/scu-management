
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

class TeacherDashboardScreen extends StatelessWidget {

  const TeacherDashboardScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : const Color(0xFFF8F9FB),

      appBar: AppBar(

        backgroundColor: Colors.transparent,

        elevation: 0,

        leading: const Icon(Icons.school, color: AppTheme.primary),

        title: const Text('SCU Smart Campus', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18, fontFamily: 'Public Sans')),

        actions: [

          IconButton(

            onPressed: () {},

            icon: Stack(

              children: [

                const Icon(Icons.notifications_none),

                Positioned(top: 0, right: 0, child: Container(width: 8, height: 8, decoration: BoxDecoration(color: Colors.red, borderRadius: BorderRadius.circular(4), border: Border.all(color: Colors.white, width: 2)))),

              ],

            ),

          ),

          const CircleAvatar(

            radius: 16,

            backgroundImage: NetworkImage('https://i.pravatar.cc/150?u=coordinat0r'),

          ),

          const SizedBox(width: 16),

        ],

      ),

      body: SingleChildScrollView(

        padding: const EdgeInsets.symmetric(horizontal: 24),

        child: Column(

          crossAxisAlignment: CrossAxisAlignment.start,

          children: [

            const SizedBox(height: 24),

            const Text('Coordinator Dashboard', style: TextStyle(fontSize: 32, fontWeight: FontWeight.w900, fontFamily: 'Public Sans', letterSpacing: -1.0)),

            const Text('Monitoring active campus initiatives', style: TextStyle(color: Colors.grey, fontWeight: FontWeight.bold, fontSize: 14)),

            const SizedBox(height: 32),

            _buildBentoGrid(isDark),

            const SizedBox(height: 40),

            _buildSectionHeader('Recent Submissions'),

            _buildSubmissionItem('Eco-Gardening Log', 'Alex Rivera', '2h ago', isDark),

            const SizedBox(height: 12),

            _buildSubmissionItem('Digital Literacy Tutor', 'Sarah Chen', '5h ago', isDark),

            const SizedBox(height: 12),

            _buildSubmissionItem('Food Bank Inventory', 'James Wilson', 'Yesterday', isDark),

            const SizedBox(height: 32),

            _buildBanner(isDark),

            const SizedBox(height: 100),

          ],

        ),

      ),

      floatingActionButton: FloatingActionButton(

        onPressed: () {},

        backgroundColor: AppTheme.primary,

        child: const Icon(Icons.add, color: Colors.white),

      ),

    );

  }

  Widget _buildBentoGrid(bool isDark) {

    return Column(

      children: [

        Container(

          width: double.infinity,

          padding: const EdgeInsets.all(24),

          decoration: BoxDecoration(

            color: const Color(0xFF006C46),

            borderRadius: BorderRadius.circular(24),

            boxShadow: [BoxShadow(color: AppTheme.primary.withOpacity(0.2), blurRadius: 10, offset: const Offset(0, 4))],

          ),

          child: Column(

            crossAxisAlignment: CrossAxisAlignment.start,

            children: [

              Text('CURRENT ECOSYSTEM', style: TextStyle(color: Colors.white.withOpacity(0.6), fontWeight: FontWeight.w900, fontSize: 10, letterSpacing: 1.0)),

              Row(

                mainAxisAlignment: MainAxisAlignment.spaceBetween,

                children: const [

                  Text('14', style: TextStyle(fontSize: 56, fontWeight: FontWeight.w900, fontFamily: 'Public Sans', color: Colors.white, letterSpacing: -1.0)),

                  Icon(Icons.account_tree, color: Colors.white, size: 40),

                ],

              ),

              const Text('Active Projects', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14)),

            ],

          ),

        ),

        const SizedBox(height: 16),

        Row(

          children: [

            Expanded(child: _buildMetricCard('28', 'Applications', Icons.pending_actions, Colors.red, isDark)),

            const SizedBox(width: 16),

            Expanded(child: _buildMetricCard('1.2k', 'Verified Hours', Icons.verified_user, AppTheme.primary, isDark)),

          ],

        ),

      ],

    );

  }

  Widget _buildMetricCard(String val, String label, IconData icon, Color color, bool isDark) {

    return Container(

      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(

        color: isDark ? Color(0xFF0F172A) : Colors.white,

        borderRadius: BorderRadius.circular(24),

        border: Border.all(color: Colors.grey.withOpacity(0.1)),

      ),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          Row(

            mainAxisAlignment: MainAxisAlignment.spaceBetween,

            children: [

              Container(padding: const EdgeInsets.all(8), decoration: BoxDecoration(color: color.withOpacity(0.1), borderRadius: BorderRadius.circular(10)), child: Icon(icon, color: color, size: 20)),

              if (val == '28') const Text('+3 today', style: TextStyle(color: Colors.red, fontWeight: FontWeight.bold, fontSize: 11)),

              if (val == '1.2k') const Text('82% goal', style: TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold, fontSize: 11)),

            ],

          ),

          const SizedBox(height: 16),

          Text(val, style: const TextStyle(fontSize: 28, fontWeight: FontWeight.w900, fontFamily: 'Public Sans')),

          Text(label.toUpperCase(), style: TextStyle(color: Colors.grey[500], fontSize: 9, fontWeight: FontWeight.w900, letterSpacing: 1.0)),

        ],

      ),

    );

  }

  Widget _buildSectionHeader(String title) {

    return Padding(

      padding: const EdgeInsets.only(bottom: 16),

      child: Row(

        mainAxisAlignment: MainAxisAlignment.spaceBetween,

        children: [

          Text(title, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, fontFamily: 'Public Sans')),

          const Text('VIEW ALL', style: TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold, fontSize: 11, letterSpacing: 1.0)),

        ],

      ),

    );

  }

  Widget _buildSubmissionItem(String title, String user, String time, bool isDark) {

    return Container(

      padding: const EdgeInsets.all(16),

      decoration: BoxDecoration(

        color: isDark ? Color(0xFF0F172A)?.withOpacity(0.5) : Colors.white,

        borderRadius: BorderRadius.circular(16),

        border: Border.all(color: Colors.grey.withOpacity(0.1)),

      ),

      child: Row(

        children: [

          Container(

            padding: const EdgeInsets.all(10),

            decoration: BoxDecoration(color: isDark ? Color(0xFF1E293B) : const Color(0xFFF2F4F6), borderRadius: BorderRadius.circular(12)),

            child: Icon(Icons.description, color: isDark ? Colors.grey[400] : Color(0xFF334155), size: 24),

          ),

          const SizedBox(width: 16),

          Expanded(

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),

                Text('by $user • $time', style: TextStyle(color: Colors.grey[500], fontSize: 11)),

              ],

            ),

          ),

          Container(

            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),

            decoration: BoxDecoration(color: AppTheme.primary.withOpacity(0.1), borderRadius: BorderRadius.circular(20)),

            child: const Text('REVIEW', style: TextStyle(color: AppTheme.primary, fontWeight: FontWeight.w900, fontSize: 9)),

          ),

        ],

      ),

    );

  }

  Widget _buildBanner(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(24),

      decoration: BoxDecoration(

        color: isDark ? Color(0xFF0F172A) : const Color(0xFFECEEF0),

        borderRadius: BorderRadius.circular(24),

      ),

      child: Column(

        children: [

          Container(

            padding: const EdgeInsets.all(16),

            decoration: BoxDecoration(color: Colors.white, shape: BoxShape.circle),

            child: const Icon(Icons.auto_awesome, color: AppTheme.primary, size: 32),

          ),

          const SizedBox(height: 16),

          const Text('Need a New Initiative?', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18, fontFamily: 'Public Sans')),

          const SizedBox(height: 8),

          const Text('Start a campus-wide project to engage more student volunteers today.', textAlign: TextAlign.center, style: TextStyle(color: Colors.grey, fontSize: 13)),

        ],

      ),

    );

  }

}
