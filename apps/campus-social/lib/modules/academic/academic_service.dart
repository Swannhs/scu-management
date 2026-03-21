import 'dart:async';

class CourseModel {
  final String id;
  final String title;
  final String professor;
  final String tag;
  final double progress;
  final String nextSession;
  final String imageUrl;

  CourseModel({
    required this.id,
    required this.title,
    required this.professor,
    required this.tag,
    required this.progress,
    required this.nextSession,
    required this.imageUrl,
  });
}

class AcademicService {
  static final List<CourseModel> _mockCourses = [
    CourseModel(
      id: '1',
      title: 'Computer Science 101',
      professor: 'Prof. Sarah Jenkins',
      tag: 'CS-CORE',
      progress: 0.65,
      nextSession: 'Tomorrow, 10:00 AM',
      imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600',
    ),
    CourseModel(
      id: '2',
      title: 'Data Structures',
      professor: 'Prof. Michael Chen',
      tag: 'CS-MAJOR',
      progress: 0.42,
      nextSession: 'Wed, 02:30 PM',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600',
    ),
    CourseModel(
      id: '3',
      title: 'Discrete Mathematics',
      professor: 'Prof. Alan Turing',
      tag: 'MATH-202',
      progress: 0.88,
      nextSession: 'Mon, 09:00 AM',
      imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd482180c?w=600',
    ),
  ];

  Future<List<CourseModel>> getOngoingCourses() async {
    await Future.delayed(const Duration(milliseconds: 600));
    return _mockCourses;
  }
}

final academicService = AcademicService();
