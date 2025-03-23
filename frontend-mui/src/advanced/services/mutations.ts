import axios from 'axios';
import omit from 'lodash/omit';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Schema } from '../schema/schema';
import { mapData } from '../utils/mapData';
import { BACKEND_URL } from './queries';

export function useCreateUser() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: Schema) => {
			await axios.post(
				`${BACKEND_URL}/users`,
				omit(mapData(data), 'variant')
			);
		},

		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['users'] });
			alert('User created!');
		},
	});
}

export function useEditUser() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: Schema) => {
			if (data.variant === 'edit') {
				await axios.put(
					`${BACKEND_URL}/users/${data.id}`,
					omit(mapData(data), 'variant')
				);
				alert('User edited successfully!');
			}
		},

		onSuccess: async (_, variables) => {
			await queryClient.invalidateQueries({ queryKey: ['users'] });

			if (variables.variant === 'edit') {
				await queryClient.invalidateQueries({
					queryKey: ['user', { id: variables.id }],
				});
			}
		},
	});
}
