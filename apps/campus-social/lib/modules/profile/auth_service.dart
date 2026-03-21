import 'dart:async';

class UserModel {
  final String id;
  final String name;
  final String email;
  final String role; // 'student' or 'teacher'
  final String? profileImageUrl;

  UserModel({
    required this.id,
    required this.name,
    required this.email,
    required this.role,
    this.profileImageUrl,
  });
}

class AuthService {
  UserModel? _currentUser;
  final _streamController = StreamController<UserModel?>.broadcast();

  Stream<UserModel?> get userState => _streamController.stream;
  UserModel? get currentUser => _currentUser;

  Future<bool> login(String email, String password) async {
    // Simulate API delay
    await Future.delayed(const Duration(milliseconds: 1200));
    
    // Simulate success
    _currentUser = UserModel(
      id: '12345',
      name: 'Elena Rodriguez',
      email: email,
      role: 'student',
      profileImageUrl: 'https://i.pravatar.cc/150?u=elena_r',
    );
    
    _streamController.add(_currentUser);
    return true;
  }

  Future<void> logout() async {
    await Future.delayed(const Duration(milliseconds: 500));
    _currentUser = null;
    _streamController.add(null);
  }

  Future<bool> register(String name, String email, String password) async {
    await Future.delayed(const Duration(milliseconds: 1500));
    return true;
  }
}

final authService = AuthService();
