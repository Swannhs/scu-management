
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

import 'package:campus_social/components/navigation/bottom_nav.dart';

class CreateOpportunityWizardScreen extends StatelessWidget {

  const CreateOpportunityWizardScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : AppTheme.backgroundLight,

      body: SafeArea(

        child: SingleChildScrollView(

          child: Padding(

            padding: const EdgeInsets.all(24.0),

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                _buildHeader(isDark),

                const SizedBox(height: 32),

                const Text(

                  'Launch Opportunity',

                  style: TextStyle(fontSize: 32, fontWeight: FontWeight.w900, fontFamily: 'Public Sans', letterSpacing: -0.5),

                ),

                const SizedBox(height: 12),

                Text(

                  'Design a meaningful service project for your students. High-quality descriptions attract more volunteers.',

                  style: TextStyle(color: Colors.grey[500], fontSize: 14, height: 1.5),

                ),

                const SizedBox(height: 32),

                _buildStepper(isDark),

                const SizedBox(height: 32),

                _buildFormSection(isDark),

                const SizedBox(height: 40),

                _buildPreviewSection(isDark),

                const SizedBox(height: 40),

                _buildProTip(isDark),

                const SizedBox(height: 100),

              ],

            ),

          ),

        ),

      ),

      bottomNavigationBar: const BottomNav(currentIndex: 2), // Service index

    );

  }

  Widget _buildHeader(bool isDark) {

    return Row(

      mainAxisAlignment: MainAxisAlignment.spaceBetween,

      children: [

        const Text(

          'EduServe',

          style: TextStyle(color: AppTheme.primary, fontSize: 18, fontWeight: FontWeight.w900),

        ),

        Row(

          children: [

            IconButton(icon: const Icon(Icons.notifications_none, color: Colors.grey), onPressed: () {}),

            const CircleAvatar(radius: 18, child: Icon(Icons.person, size: 20)),

          ],

        ),

      ],

    );

  }

  Widget _buildStepper(bool isDark) {

    return Row(

      children: [

        _buildStep(1, 'Details', true),

        _buildLine(),

        _buildStep(2, 'Logistics', false),

        _buildLine(),

        _buildStep(3, 'Review', false),

      ],

    );

  }

  Widget _buildStep(int num, String label, bool isActive) {

    return Row(

      children: [

        Container(

          width: 24,

          height: 24,

          decoration: BoxDecoration(color: isActive ? AppTheme.primary : Colors.grey[300], shape: BoxShape.circle),

          child: Center(child: Text(num.toString(), style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold))),

        ),

        const SizedBox(width: 8),

        Text(label, style: TextStyle(color: isActive ? Colors.black87 : Colors.grey[400], fontSize: 12, fontWeight: FontWeight.bold)),

      ],

    );

  }

  Widget _buildLine() {

    return Expanded(child: Container(height: 1, color: Colors.grey[300], margin: const EdgeInsets.symmetric(horizontal: 12)));

  }

  Widget _buildFormSection(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(24),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(24),

        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 20, offset: const Offset(0, 4))],

      ),

      child: Column(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          _buildFormField('PROJECT NAME', 'e.g., Riverside Community Cleanup', false, isDark),

          const SizedBox(height: 24),

          _buildFormField('REQUIREMENTS', 'Mention age limits, certifications, or physical demands...', true, isDark),

          const SizedBox(height: 24),

          _buildFormField('DATE & TIME', 'mm/dd/yyyy, --:-- --', false, isDark, suffix: Icons.calendar_today),

          const SizedBox(height: 24),

          _buildFormField('SKILLS NEEDED', 'Select Primary Skill', false, isDark, suffix: Icons.keyboard_arrow_down),

          const SizedBox(height: 32),

          Row(

            children: [

              TextButton(onPressed: () {}, child: const Text('Save as Draft', style: TextStyle(color: Colors.grey, fontWeight: FontWeight.bold))),

              const Spacer(),

              ElevatedButton(

                onPressed: () {},

                style: ElevatedButton.styleFrom(backgroundColor: AppTheme.primary, padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16), shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12))),

                child: const Text('Continue to Logistics', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),

              ),

            ],

          ),

        ],

      ),

    );

  }

  Widget _buildFormField(String label, String hint, bool isLarge, bool isDark, {IconData? suffix}) {

    return Column(

      crossAxisAlignment: CrossAxisAlignment.start,

      children: [

        Text(label, style: const TextStyle(color: Colors.grey, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1)),

        const SizedBox(height: 8),

        Container(

          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),

          decoration: BoxDecoration(color: Colors.grey[100], borderRadius: BorderRadius.circular(12)),

          child: TextField(

            maxLines: isLarge ? 4 : 1,

            decoration: InputDecoration(

              hintText: hint,

              hintStyle: TextStyle(color: Colors.grey[400], fontSize: 13),

              border: InputBorder.none,

              suffixIcon: suffix != null ? Icon(suffix, size: 18, color: Colors.grey) : null,

            ),

          ),

        ),

      ],

    );

  }

  Widget _buildPreviewSection(bool isDark) {

    return Column(

      crossAxisAlignment: CrossAxisAlignment.start,

      children: [

        Row(

          mainAxisAlignment: MainAxisAlignment.spaceBetween,

          children: [

            const Text('STUDENT VIEW PREVIEW!', style: TextStyle(color: Colors.grey, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1)),

            Container(padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4), decoration: BoxDecoration(color: Colors.grey[100], borderRadius: BorderRadius.circular(4)), child: Row(children: const [Icon(Icons.visibility, size: 12, color: AppTheme.primary), SizedBox(width: 4), Text('LIVE REVIEW', style: TextStyle(color: AppTheme.primary, fontSize: 8, fontWeight: FontWeight.bold))])),

          ],

        ),

        const SizedBox(height: 16),

        Container(

          decoration: BoxDecoration(

            color: isDark ? AppTheme.cardDark : Colors.white,

            borderRadius: BorderRadius.circular(24),

            boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 20, offset: const Offset(0, 10))],

          ),

          child: Column(

            crossAxisAlignment: CrossAxisAlignment.start,

            children: [

              Container(

                height: 160,

                width: double.infinity,

                decoration: BoxDecoration(

                  borderRadius: BorderRadius.vertical(top: Radius.circular(24)),

                  image: DecorationImage(image: NetworkImage('https://images.unsplash.com/photo-1544333346-64660334805d?w=800'), fit: BoxFit.cover),

                ),

                child: Container(

                  padding: const EdgeInsets.all(24),

                  decoration: BoxDecoration(borderRadius: const BorderRadius.vertical(top: Radius.circular(24)), gradient: LinearGradient(begin: Alignment.topCenter, end: Alignment.bottomCenter, colors: [Colors.transparent, Colors.black.withOpacity(0.8)])),

                  child: Column(

                    mainAxisAlignment: MainAxisAlignment.end,

                    crossAxisAlignment: CrossAxisAlignment.start,

                    children: [

                      Container(padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4), decoration: BoxDecoration(color: AppTheme.primary, borderRadius: BorderRadius.circular(6)), child: const Text('SERVICE PROJECT', style: TextStyle(color: Colors.white, fontSize: 8, fontWeight: FontWeight.bold))),

                      const SizedBox(height: 8),

                      const Text('Riverside Community Cleanup', style: TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold)),

                    ],

                  ),

                ),

              ),

              Padding(

                padding: const EdgeInsets.all(20.0),

                child: Column(

                  crossAxisAlignment: CrossAxisAlignment.start,

                  children: [

                    Row(

                      children: [

                        _SmallInfo(Icons.calendar_today, 'Oct 24, 2024'),

                        const SizedBox(width: 16),

                        _SmallInfo(Icons.access_time, '09:00 AM'),

                      ],

                    ),

                    const SizedBox(height: 16),

                    const Text('REQUIREMENTS', style: TextStyle(color: Colors.grey, fontSize: 9, fontWeight: FontWeight.bold)),

                    const SizedBox(height: 4),

                    const Text('All volunteers must wear closed-toe shoes and bring a reusable water bottle...', style: TextStyle(fontSize: 12, height: 1.4, fontStyle: FontStyle.italic)),

                    const SizedBox(height: 16),

                    Row(

                      children: [

                        _SmallChip('Conservation'),

                        _SmallChip('Teamwork'),

                        _SmallChip('+3 More'),

                      ],

                    ),

                    const SizedBox(height: 20),

                    Container(padding: const EdgeInsets.symmetric(vertical: 12), width: double.infinity, decoration: BoxDecoration(color: Colors.grey[100], borderRadius: BorderRadius.circular(12)), child: Center(child: Text('Registration Opens Oct 1st', style: TextStyle(color: Colors.grey, fontWeight: FontWeight.bold, fontSize: 13)))),

                  ],

                ),

              ),

            ],

          ),

        ),

      ],

    );

  }

  Widget _buildProTip(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(color: Colors.green[50], borderRadius: BorderRadius.circular(20)),

      child: Row(

        crossAxisAlignment: CrossAxisAlignment.start,

        children: [

          const Icon(Icons.lightbulb, color: AppTheme.primary, size: 20),

          const SizedBox(width: 16),

          Expanded(

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                const Text('Teacher Pro-Tip', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),

                const SizedBox(height: 4),

                RichText(

                  text: const TextSpan(

                    style: TextStyle(color: Colors.black87, fontSize: 12, height: 1.5),

                    children: [

                      TextSpan(text: 'Projects with specific skill tags see '),

                      TextSpan(text: '60% higher engagement', style: TextStyle(fontWeight: FontWeight.bold, color: AppTheme.primary)),

                      TextSpan(text: ' from students looking to boost their college portfolios.'),

                    ],

                  ),

                ),

              ],

            ),

          ),

        ],

      ),

    );

  }

}

class _SmallInfo extends StatelessWidget {

  final IconData icon;

  final String label;

  const _SmallInfo(this.icon, this.label);

  @override

  Widget build(BuildContext context) {

    return Row(

      children: [

        Icon(icon, size: 14, color: AppTheme.primary),

        const SizedBox(width: 6),

        Text(label, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w500)),

      ],

    );

  }

}

class _SmallChip extends StatelessWidget {

  final String label;

  const _SmallChip(this.label);

  @override

  Widget build(BuildContext context) {

    return Container(

      margin: const EdgeInsets.only(right: 8),

      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),

      decoration: BoxDecoration(color: Colors.grey[200], borderRadius: BorderRadius.circular(20)),

      child: Text(label, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w500)),

    );

  }

}
