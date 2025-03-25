import { z } from 'zod';

export const RegexPatterns = {
	email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
};

export const simpleUserSchema = z
	.intersection(
		z.object({
			name: z.string().min(5, { message: 'Name must be at least 5 characters' }),
			email: z
				.string()
				.min(1, { message: 'Email is required' })
				.refine((text) => RegexPatterns.email.test(text), {
					message: 'Email not valid',
				}),
			age: z
				.number()
				.min(18, { message: 'Age must be at least 18' })
				.max(99, { message: 'Age must be less than 100' }),
			states: z.array(z.string()).min(1, { message: 'Must select at least 1 state' }).max(2, { message: 'At most 2 states' }),
			languagesSpoken: z.array(z.string()).min(1, {
				message: 'You must select at least 1 language'
			}).max(2, {
				message: 'You can select up to 2 languages'
			}),
			gender: z.string().min(1, { message: 'Must select a gender' }),
			skills: z.array(z.string()).min(1, {
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
	.refine(
		(data) => !(data.age > 40) || data.skills.length >= 4,
		{
			message: "Users over 40 must select >= 4 skills",
			path: ["skills"]
		}
	)
	.refine(
		(data) => !(data.age > 30 && data.age <= 40) || data.skills.length >= 3,
		{
			message: "Users over 30 must select >= 3 skills",
			path: ["skills"]
		}
	)
	.refine(
		(data) => {
			const eighteenYearsAgo = new Date(data.registrationDateAndTime);
			eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - data.age);
			return eighteenYearsAgo.getFullYear() <= new Date().getFullYear() - 18;
		},
		{
			message: "Registration date cannot be before user reaching 18 years old",
			path: ["registrationDateAndTime"]
		}
	);
export type ZSimpleUserType = z.infer<typeof simpleUserSchema>;

export const defaultValues: ZSimpleUserType = {
	variant: 'create',
	email: '',
	age: 18,
	name: '',
	states: [],
	languagesSpoken: [],
	gender: '',
	skills: [],
	registrationDateAndTime: new Date(),
	formerEmploymentPeriod: [new Date(), new Date()],
	salaryRange: [0, 2000],
};
