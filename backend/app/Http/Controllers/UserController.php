<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // =========================
    // 👑 ADMIN: LIST USERS
    // =========================
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => User::paginate(10)
        ]);
    }

    // =========================
    // 👤 ADMIN: SINGLE USER
    // =========================
    public function show($id)
    {
        $user = User::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $user
        ]);
    }

    // =========================
    // 👑 ADMIN: UPDATE USER (SAFE)
    // =========================
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'name' => 'sometimes|string',
            'email' => 'sometimes|email|unique:users,email,' . $id,
            'password' => 'sometimes|min:6'
        ]);

        $data = [];

        if ($request->name) {
            $data['name'] = $request->name;
        }

        if ($request->email) {
            $data['email'] = $request->email;
        }

        if ($request->password) {
            $data['password'] = Hash::make($request->password);
        }

        $user->update($data);

        return response()->json([
            'success' => true,
            'message' => 'User updated successfully',
            'data' => $user
        ]);
    }

    // =========================
    // 👑 ADMIN: DELETE USER
    // =========================
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json([
            'success' => true,
            'message' => 'User deleted successfully'
        ]);
    }

    // =========================
    // 👤 USER: PROFILE
    // =========================
    public function me(Request $request)
    {
        return response()->json([
            'success' => true,
            'data' => $request->user()
        ]);
    }

    // =========================
    // 👤 USER: UPDATE SELF
    // =========================
    public function updateSelf(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'name' => 'sometimes|string',
            'email' => 'sometimes|email|unique:users,email,' . $user->id
        ]);

        $user->update($request->only([
            'name',
            'email'
        ]));

        return response()->json([
            'success' => true,
            'message' => 'Profile updated successfully',
            'data' => $user
        ]);
    }

    // =========================
    // 👤 USER: DELETE SELF (SAFE + TOKEN CLEANUP)
    // =========================
    public function deleteSelf(Request $request)
    {
        $user = $request->user();

        // 🔐 hapus semua token Sanctum
        $user->tokens()->delete();

        $user->delete();

        return response()->json([
            'success' => true,
            'message' => 'Account deleted successfully'
        ]);
    }
}