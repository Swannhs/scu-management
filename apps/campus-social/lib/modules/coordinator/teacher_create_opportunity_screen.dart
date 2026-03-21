
import 'package:flutter/material.dart';

import 'package:campus_social/theme/app_theme.dart';

class TeacherCreateOpportunityScreen extends StatelessWidget {

  const TeacherCreateOpportunityScreen({super.key});

  @override

  Widget build(BuildContext context) {

    bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(

      backgroundColor: isDark ? AppTheme.backgroundDark : const Color(0xFFF8F9FA),

      appBar: AppBar(

        title: const Text('Create Opportunity', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

        leading: IconButton(icon: const Icon(Icons.arrow_back), onPressed: () => Navigator.pop(context)),

        actions: [

          Center(

            child: Padding(

              padding: const EdgeInsets.only(right: 24.0),

              child: Text('Step 1 of 3', style: TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold, fontSize: 12)),

            ),

          ),

        ],

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

              const SizedBox(height: 16),

              const Text('New Impact Project', style: TextStyle(fontSize: 24, fontWeight: FontWeight.w900, fontFamily: 'Public Sans')),

              const SizedBox(height: 8),

              Text('Fill in the details to start mobilizing your students.', style: TextStyle(color: Colors.grey[500], fontSize: 14)),

              

              const SizedBox(height: 32),

              _buildSectionTitle('PROJECT INFO'),

              const SizedBox(height: 24),

              _buildLabel('Project Title'),

              _buildTextField('e.g. Community Garden Cleanup', isDark),

              const SizedBox(height: 24),

              _buildLabel('Description'),

              _buildTextField('Describe the impact and goals...', isDark, maxLines: 4),

              const SizedBox(height: 24),

              _buildLabel('Category'),

              _buildDropdownField('Environment', isDark),

              

              const SizedBox(height: 48),

              _buildSectionTitle('LOGISTICS'),

              const SizedBox(height: 24),

              _buildLabel('Date & Time'),

              _buildTextField('mm/dd/yyyy, --:-- --', isDark, icon: Icons.calendar_today_outlined),

              const SizedBox(height: 24),

              _buildLabel('Location'),

              _buildTextField('Search address or room number', isDark, icon: Icons.location_on_outlined, iconColor: AppTheme.primary),

              const SizedBox(height: 24),

              Row(

                children: [

                  Expanded(

                    child: Column(

                      crossAxisAlignment: CrossAxisAlignment.start,

                      children: [

                        _buildLabel('Capacity'),

                        _buildTextField('0', isDark),

                      ],

                    ),

                  ),

                  const SizedBox(width: 16),

                  Expanded(

                    child: Column(

                      crossAxisAlignment: CrossAxisAlignment.start,

                      children: [

                        _buildLabel('Service Hours'),

                        _buildTextField('0', isDark),

                      ],

                    ),

                  ),

                ],

              ),

              const SizedBox(height: 24),

              _buildLabel('Application Deadline'),

              _buildTextField('mm/dd/yyyy', isDark, icon: Icons.calendar_today_outlined),

              

              const SizedBox(height: 48),

              _buildSectionTitle('REQUIREMENTS'),

              const SizedBox(height: 24),

              _buildLabel('Student Requirements'),

              _buildTextField('List any skills, tools, or dress codes required...', isDark, maxLines: 4),

              

              const SizedBox(height: 48),

              ElevatedButton(

                onPressed: () {},

                style: ElevatedButton.styleFrom(

                  backgroundColor: AppTheme.primary,

                  foregroundColor: Colors.white,

                  minimumSize: const Size(double.infinity, 56),

                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),

                  elevation: 0,

                ),

                child: const Text('Publish Opportunity', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),

              ),

              const SizedBox(height: 12),

              OutlinedButton(

                onPressed: () {},

                style: OutlinedButton.styleFrom(

                  foregroundColor: Colors.grey[600],

                  minimumSize: const Size(double.infinity, 56),

                  side: BorderSide(color: Colors.grey[300]!),

                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),

                ),

                child: const Text('Save as Draft', style: TextStyle(fontWeight: FontWeight.bold)),

              ),

              const SizedBox(height: 100),

            ],

          ),

        ),

      ),

    );

  }

  Widget _buildSectionTitle(String title) {

    return Row(

      children: [

        Container(width: 4, height: 16, decoration: BoxDecoration(color: AppTheme.primary, borderRadius: BorderRadius.circular(2))),

        const SizedBox(width: 8),

        Text(title, style: TextStyle(color: Colors.grey[600], fontSize: 13, fontWeight: FontWeight.bold, letterSpacing: 1)),

      ],

    );

  }

  Widget _buildLabel(String text) {

    return Padding(

      padding: const EdgeInsets.only(bottom: 8.0),

      child: Text(text, style: TextStyle(color: Colors.grey[700], fontSize: 12, fontWeight: FontWeight.bold)),

    );

  }

  Widget _buildTextField(String hint, bool isDark, {int maxLines = 1, IconData? icon, Color? iconColor}) {

    return Container(

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : const Color(0xFFE9ECEF).withOpacity(0.5),

        borderRadius: BorderRadius.circular(12),

      ),

      child: TextField(

        maxLines: maxLines,

        decoration: InputDecoration(

          hintText: hint,

          hintStyle: TextStyle(color: Colors.grey[500], fontSize: 14),

          prefixIcon: icon != null ? Icon(icon, color: iconColor ?? Colors.grey[500], size: 18) : null,

          contentPadding: const EdgeInsets.all(16),

          border: InputBorder.none,

        ),

      ),

    );

  }

  Widget _buildDropdownField(String value, bool isDark) {

    return Container(

      padding: const EdgeInsets.symmetric(horizontal: 16),

      decoration: BoxDecoration(

        color: isDark ? AppTheme.cardDark : const Color(0xFFE9ECEF).withOpacity(0.5),

        borderRadius: BorderRadius.circular(12),

      ),

      child: Row(

        mainAxisAlignment: MainAxisAlignment.spaceBetween,

        children: [

          Text(value, style: const TextStyle(fontSize: 14)),

          Icon(Icons.unfold_more, color: Colors.grey[500], size: 20),

        ],

      ),

    );

  }

}
