import { z } from 'zod';

export const RegexPatterns = {
	email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
};

export const schema = z
	.intersection(
		z.object({
			name: z.string().min(5, { message: 'Name must be at least 5 characters' }),
			email: z
				.string()
				.min(1, { message: 'Email is required' })
				.refine((text) => RegexPatterns.email.test(text), {
					message: 'Email not valid',
				}),
			states: z.array(z.string()).min(1, { message: 'Must select at least 1 state' }).max(2, { message: 'At most 2 states' }),
			languagesSpoken: z.array(z.string()).min(1, {
				message: 'You must select at least 1 language'
			}).max(2, {
				message: 'You can select up to 2 languages'
			}),
			gender: z.string().min(1, { message: 'Must select a gender' }),
			skills: z.array(z.string()).max(3, {
				message: 'You can select up to 3 skills'
			}).min(1, {
				message: 'You must select at least 1 skill'
			}),
			registrationDateAndTime: z.date().refine(date => date <= new Date(), {
				message: 'Registration date must be in the past or present'
			}),
			formerEmploymentPeriod: z.array(z.date()).min(2).max(2),
			salaryRange: z.array(z.number()).max(2),
		}),

		z.discriminatedUnion('variant', [
			z.object({ variant: z.literal('create') }),
			z.object({ variant: z.literal('edit'), id: z.string().min(1) }),
		])
	)
	.and(
		z.union([
			z.object({ isTeacher: z.literal(false) }),
			z.object({
				isTeacher: z.literal(true),

				students: z.array(
					z.object({
						name: z.string().min(4),
					})
				),
			}),
		])
	);
export type SimpleUserType = z.infer<typeof schema>;

export const defaultValues: SimpleUserType = {
	variant: 'create',
	email: '',
	name: '',
	states: [],
	languagesSpoken: [],
	gender: '',
	skills: [],
	registrationDateAndTime: new Date(),
	formerEmploymentPeriod: [new Date(), new Date()],
	salaryRange: [0, 2000],
	isTeacher: false,
};
