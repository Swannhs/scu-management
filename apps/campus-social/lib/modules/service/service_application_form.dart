
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

class ServiceApplicationFormScreen extends StatefulWidget {

  const ServiceApplicationFormScreen({super.key});

  @override

  State<ServiceApplicationFormScreen> createState() => _ServiceApplicationFormScreenState();

}

class _ServiceApplicationFormScreenState extends State<ServiceApplicationFormScreen> {

  bool _agreed = true;

  final List<String> _selectedSkills = ['Organization', 'Communication'];

  final List<String> _allSkills = ['Organization', 'Communication', 'Leadership', 'Logistics', 'Teamwork'];

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : AppTheme.backgroundLight,

      appBar: AppBar(

        title: const Text('Apply for Service', style: TextStyle(fontWeight: FontWeight.bold)),

        leading: IconButton(icon: const Icon(Icons.arrow_back), onPressed: () => Navigator.pop(context)),

        actions: const [

          Padding(

            padding: EdgeInsets.only(right: 16.0),

            child: CircleAvatar(radius: 18, backgroundImage: NetworkImage('https://i.pravatar.cc/150?u=user')),

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

              _buildHeaderCard(isDark),

              const SizedBox(height: 32),

              const Text('Why do you want to join?', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

              const SizedBox(height: 16),

              _buildMotivationField(isDark),

              const SizedBox(height: 32),

              const Text('Relevant Skills', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

              const SizedBox(height: 16),

              _buildSkillsWrap(isDark),

              const SizedBox(height: 32),

              const Text('Availability', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

              const SizedBox(height: 16),

              _buildPickerField('START DATE', 'Monday, Oct 24', Icons.calendar_today, isDark),

              const SizedBox(height: 12),

              _buildPickerField('PREFERRED TIME', 'Afternoon (2 PM - 5 PM)', Icons.access_time_filled, isDark),

              const SizedBox(height: 32),

              _buildAgreementSection(isDark),

              const SizedBox(height: 48),

              _buildSubmitButton(context, isDark),

              const SizedBox(height: 100),

            ],

          ),

        ),

      ),

    );

  }

  Widget _buildHeaderCard(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.primary.withOpacity(0.1) : AppTheme.primary.withOpacity(0.08),

        borderRadius: BorderRadius.circular(24),

      ),

      child: Row(

        children: [

          Container(

            padding: const EdgeInsets.all(12),

            decoration: BoxDecoration(color: AppTheme.primary, borderRadius: BorderRadius.circular(16)),

            child: const Icon(Icons.volunteer_activism, color: Colors.white, size: 28),

          ),

          const SizedBox(width: 16),

          Expanded(

            child: Column(

              crossAxisAlignment: CrossAxisAlignment.start,

              children: [

                const Text('Campus Food Bank Helper', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),

                const SizedBox(height: 4),

                Text('Student Union • Weekly Program', style: TextStyle(color: Colors.grey[600], fontSize: 13)),

              ],

            ),

          ),

        ],

      ),

    );

  }

  Widget _buildMotivationField(bool isDark) {

    return Container(

      height: 160,

      padding: const EdgeInsets.all(16),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : Colors.white,

        borderRadius: BorderRadius.circular(24),

        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 10, offset: const Offset(0, 4))],

      ),

      child: TextField(

        maxLines: null,

        decoration: InputDecoration(

          hintText: 'Share your motivation and what you hope to contribute...',

          hintStyle: TextStyle(color: Colors.grey[400], fontSize: 14),

          border: InputBorder.none,

        ),

      ),

    );

  }

  Widget _buildSkillsWrap(bool isDark) {

    return Wrap(

      spacing: 8,

      runSpacing: 12,

      children: [

        ..._allSkills.map((skill) {

          bool isSelected = _selectedSkills.contains(skill);

          return GestureDetector(

            onTap: () {

              setState(() {

                if (isSelected) {

                  _selectedSkills.remove(skill);

                } else {

                  _selectedSkills.add(skill);

                }

              });

            },

            child: Container(

              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),

              decoration: BoxDecoration(

                color: isSelected ? AppTheme.primary : (isDark ? Color(0xFF0F172A) : Colors.grey[100]),

                borderRadius: BorderRadius.circular(20),

              ),

              child: Row(

                mainAxisSize: MainAxisSize.min,

                children: [

                  Text(

                    skill,

                    style: TextStyle(

                      color: isSelected ? Colors.white : (isDark ? Colors.grey[400] : Colors.black87),

                      fontWeight: FontWeight.bold,

                      fontSize: 13,

                    ),

                  ),

                  if (isSelected) const SizedBox(width: 6),

                  if (isSelected) const Icon(Icons.check, color: Colors.white, size: 14),

                ],

              ),

            ),

          );

        }).toList(),

        Container(

          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),

          decoration: BoxDecoration(

            color: AppTheme.primary.withOpacity(0.1),

            borderRadius: BorderRadius.circular(20),

          ),

          child: Row(

            mainAxisSize: MainAxisSize.min,

            children: const [

              Icon(Icons.add, color: AppTheme.primary, size: 16),

              SizedBox(width: 4),

              Text('Add Other', style: TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold, fontSize: 13)),

            ],

          ),

        ),

      ],

    );

  }

  Widget _buildPickerField(String label, String value, IconData icon, bool isDark) {

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

          Text(label, style: const TextStyle(color: Colors.grey, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1)),

          const SizedBox(height: 8),

          Row(

            children: [

              Icon(icon, size: 20, color: AppTheme.primary),

              const SizedBox(width: 12),

              Expanded(child: Text(value, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold))),

              const Icon(Icons.keyboard_arrow_down, color: Colors.grey),

            ],

          ),

        ],

      ),

    );

  }

  Widget _buildAgreementSection(bool isDark) {

    return Container(

      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(color: Colors.grey[100], borderRadius: BorderRadius.circular(24)),

      child: Row(

        children: [

          Switch(

            value: _agreed,

            onChanged: (val) => setState(() => _agreed = val),

            activeColor: AppTheme.primary,

          ),

          const SizedBox(width: 12),

          const Expanded(

            child: Text.rich(

              TextSpan(

                style: TextStyle(fontSize: 12, height: 1.4),

                children: [

                  TextSpan(text: 'I agree to the '),

                  TextSpan(text: 'Volunteer Terms', style: TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold)),

                  TextSpan(text: ' and confirm my availability for the selected duration.'),

                ],

              ),

            ),

          ),

        ],

      ),

    );

  }

  Widget _buildSubmitButton(BuildContext context, bool isDark) {

    return Column(

      children: [

        ElevatedButton(

          onPressed: _agreed ? () => _handleSubmit(context) : null,

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

              Text('Submit Application', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),

              SizedBox(width: 12),

              Icon(Icons.send, size: 20),

            ],

          ),

        ),

        const SizedBox(height: 16),

        Text(

          'By submitting, your application will be reviewed\nby the service coordinator within 2-3 business days.',

          textAlign: TextAlign.center,

          style: TextStyle(color: Colors.grey[500], fontSize: 11, height: 1.5),

        ),

      ],

    );

  }

  void _handleSubmit(BuildContext context) {

    ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Application Submitted Successfully!'), backgroundColor: AppTheme.primary));

    Navigator.pop(context);

  }

}
